interface SearchPatternCheckResultValue {
    pattern?: SearchPattern;
    field: string;
    rawValue: string;
    values: string[];
    valid: boolean;
    step?: string;
    options?: string[];
    presetedValues?: string[];
}
interface SearchPatternCheckResult {
    valid: boolean;
    patterns: SearchPatternCheckResultValue[];
    pairs?: {
        [x: string]: string | string[];
    };
    /**
     * @desc 错误信息，表示第一个错误的模式
     */
    errorPattern?: SearchPatternCheckResultValue;
    /**
     * @desc 当前输入阶段，field/value
     */
    step: string;
    /**
     * @desc 当前输入建议项
     */
    options: string[];
    /**
     * 是否可选--field 可选表示有空模式，可在开头自由输入
     */
    optional: boolean;
}
interface SearchPattern {
    /**
     * @desc 如果 field 为空，表示空模式（字段）
     */
    field?: string;
    values?: string[];
    /**
     * @desc 值分隔符，当可以存在多个值的时候，以此作为分隔符。默认 '-'
     */
    seperator?: string;
    multiple?: boolean;
}
interface SearchPatternCfg {
    /**
     * @desc 模式数量限制，默认一个，0 表示无限制
     */
    patterns: SearchPattern[];
}
/**
 * @name patternCompile
 * @param {SearchPatternCfg} cfg
 * @param {string} text 输入字符串
 * @param {boolean} final 是否输入结束
 * @desc 模式检查，返回模式检查结果以及输入可选项
 * ```markdown
 * 检查步骤
 * 1. 已完成模式（final === true 或者非最后一个模式）
 *   1.1 非 / 开头--字符串第一个字符
 *     1.1.1 允许空模式--匹配
 *     1.1.2 不允许空模式--不匹配
 *   1.2 / 开头
 *     1.2.1 模式开始，截止到第一个 : 为 field，尝试匹配
 *     1.2.2 : 后面为值，连字符拆分，有指定值范围则尝试匹配
 * 2. 输入中模式（final === false 并且最后一个模式）
 *   2.1 非 / 开头--字符串第一个字符
 *     2.1.1 允许空模式--匹配
 *     2.1.2 不允许空模式--不匹配
 *   2.2 / 开头
 *     2.2.1 模式开始，没有 :，用 startsWith 匹配 field，有 : 则完全匹配
 *     2.2.2 : 后的值，连字符拆分，如果有指定范围，用 startsWith 匹配，否则直接通过
 * ```
 */
declare function searchPatternCheck(cfg: SearchPatternCfg, text: string, final?: boolean): SearchPatternCheckResult;

export { SearchPattern, SearchPatternCfg, SearchPatternCheckResult, SearchPatternCheckResultValue, searchPatternCheck as default };
