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
            addTaskTitles: cfg?.addTaskTitles ?? true,
            taskBorderRadius: this._parseTaskBorderRadius(cfg?.taskBorderRadius),
            showGrid: cfg?.showGrid ?? true,
            showLegends: cfg?.showLegends ?? true,
            gridOpacity: cfg?.gridOpacity || 1,
            gridHolidayColor: cfg?.gridHolidayColor || '#ccc',
            gridLineColor: cfg?.gridLineColor || 'black',
            dependencyCssClass: cfg?.dependencyCssClass || 'gantt-task-dependency',
            dependencyOpacity: cfg?.dependencyOpacity ?? 1,
            dependencyStrokeWidth: cfg?.dependencyStrokeWidth ?? 1,
            dependencyArrowSize: cfg?.dependencyArrowSize ?? 5,
            timelineLegendCssClass: cfg?.timelineLegendCssClass || 'gantt-timeline-legend',
            timelineLegendHeight: cfg?.timelineLegendHeight || 40,
        }
    }

    private static _parseTaskBorderRadius(tbr?: number | number[]): number[] | number {
        if (tbr == null) {
            return 0;
        }
        else if (Array.isArray(tbr)) {
            if (tbr.length < 2) {
                throw new Error("taskBorderRadius array should have at least 2 elements");
            }
            else if (tbr.length == 2) {
                return [tbr[0], tbr[0],tbr[1],tbr[1]];
            }
            else if (tbr.length == 3) {
                return [tbr[0], tbr[1],tbr[2], 0];
            }
            else if (tbr.length > 3) {
                return [tbr[0], tbr[1],tbr[2], tbr[3]];
            }
        }
        else {
            return [tbr, tbr, tbr, tbr]
        }
        throw new Error("Can't parse taskBorderRadius");
    }
}

