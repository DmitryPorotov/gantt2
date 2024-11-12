export interface IConfig {
    taskDefaultColor?: string
    showTaskNames?: boolean
    addTaskTitles?: boolean
    taskCssClass?: string
    taskStrokeColor?: string
    taskStrokeWidth?: number
    taskHeight?: number
    taskDayWidth?: number
    taskHolidayWidth?: number
    taskVPadding?: number
    weekEnds?: number[]
    holidays?: {[date: string]: string}
    taskBorderRadius?: number | number[]
    showGrid?: boolean
    showLegends?: boolean
    gridOpacity?: number
}
