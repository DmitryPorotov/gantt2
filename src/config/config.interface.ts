export interface IConfig {
    taskDefaultColor?: string
    showTaskNames?: boolean
    taskCssClass?: string
    taskStrokeColor?: string
    taskStrokeWidth?: number
    taskHeight?: number
    taskDayWidth?: number
    taskHolidayWidth?: number
    taskVPadding?: number
    weekEnds?: number[]
    holidays?: {[date: string]: string}
}
