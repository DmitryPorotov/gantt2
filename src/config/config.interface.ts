export interface IConfig {
    taskDefaultColor?: string
    taskStrokeColor?: string
    taskStrokeWidth?: number
    taskHeight?: number
    taskBorderRadius?: number | number[]
    taskDayWidth?: number
    taskHolidayWidth?: number
    showTaskNames?: boolean
    taskCssClass?: string
    addTaskTitles?: boolean
    taskVPadding?: number
    weekEnds?: number[]
    holidays?: {[date: string]: string}
    showGrid?: boolean
    showLegends?: boolean
    gridOpacity?: number
    gridLineColor?: string
    gridHolidayColor?: string
    dependencyCssClass?: string
    dependencyOpacity?: number
    dependencyStrokeWidth?: number
    dependencyArrowSize?: number
    timelineLegendCssClass?: string
    timelineLegendHeight?: number
}
