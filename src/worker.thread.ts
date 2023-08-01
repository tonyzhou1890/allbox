// worker 收到信息并执行相关操作
function thread (utils: any): (e: MessageEvent) => any {
  return function (e: MessageEvent) {
    const { action, param = [], _sign } = e.data
    if (typeof utils[action] === 'function') {
      const res = {
        action,
        result: utils[action](...param),
        _sign,
      }
      postMessage(res)
    } else {
      console.log(`指定操作${action}不存在`)
    }
  }
}

export default thread
