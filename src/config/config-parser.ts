import {IConfig} from "./config.interface";

export type Config = {[key in keyof IConfig]-? : IConfig[key]}

export default class ConfigParser {
    static parse(cfg?: IConfig): Config {
        return {
            taskDefaultColor: cfg?.taskDefaultColor || '#8cb6ce',
            showTaskNames: cfg?.showTaskNames ?? true,
            taskCssClass: cfg?.taskCssClass || "gantt-task",
            taskStrokeColor: cfg?.taskStrokeColor || 'black',
            taskDayWidth: cfg?.taskDayWidth || 50,
            taskHeight: cfg?.taskHeight || 15,
            taskVPadding: cfg?.taskVPadding ?? 8,
            taskStrokeWidth: cfg?.taskStrokeWidth ?? 1,
            weekEnds: cfg?.weekEnds || [0, 6],
            taskHolidayWidth: cfg?.taskHolidayWidth ?? 4,
            holidays: cfg?.holidays || {},
        }
    }
}

