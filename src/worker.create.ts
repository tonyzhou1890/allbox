import { WorkerCallPromisify } from './types/index'
import getTypeName from './other.get-type-name'

/**
 * worker job type
 */
export interface WorkerJobType {
  action: string
  param?: Array<any>
}

/**
 * worker job wrap type
 */
export interface WorkerJobWrapType {
  _sign: number
  job: WorkerJobType
  p: {
    resolve: (value: unknown) => void
    reject: (value: unknown) => void
  }
}

function create (w: string | (() => Worker)): WorkerUtils {
  const type = getTypeName(w)
  if (type !== 'String' && type !== 'Function') {
    throw new Error('worker 参数类型错误')
  }

  const workerNum = Math.max(window.navigator.hardwareConcurrency - 1, 1) // 线程数量
  const quene = new Map()
  const waiting: Array<WorkerJobWrapType> = []
  const workers = new Array(workerNum).fill(null).map((_, index) => {
    return {
      index,
      worker: type === 'String' ? new Worker(w as string) : (w as () => Worker)(),
      idle: true, // 是否空闲
    }
  })

  workers.map(item => {
    item.worker.addEventListener('message', e => {
      if (!e.data || !e.data._sign) {
        console.error('worker 返回数据错误')
        quene.get(e.data._sign).reject('worker 返回数据错误')
      } else {
        quene.get(e.data._sign).resolve(e.data.result)
        quene.delete(e.data._sign)
        item.idle = true
        // 尝试接受新任务
        assignJob()
      }
    })
  })

  /**
   * 将等待队列中的任务加入空闲线程
   */
  function assignJob () {
    let idleWorker = null
    let waitingJob = null
    if (waiting.length) {
      idleWorker = workers.find(item => item.idle)
      if (idleWorker) {
        idleWorker.idle = false
        waitingJob = waiting.shift() as WorkerJobWrapType
        quene.set(waitingJob._sign, waitingJob.p)

        idleWorker.worker.postMessage({
          ...waitingJob.job,
          _sign: waitingJob._sign,
        })
      }
    }
  }

  const fns = new Proxy({} as WorkerUtils, {
    get (target, prop) {
      return function (...rest: any) {
        return new Promise((resolve, reject) => {
          const _sign = Date.now() * Math.random()
          waiting.push({
            _sign,
            job: {
              action: prop as string,
              param: rest,
            },
            p: { resolve, reject },
          })
          // 分配线程
          assignJob()
        })
      }
    },
  })

  return fns
}

export interface WorkerUtils {
  [key: string]: WorkerCallPromisify<(...args: any) => any>
}

export default create
