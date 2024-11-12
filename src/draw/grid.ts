import {ParsedData} from "../data/data-parser";
import {Config} from "../config/config-parser";
import Task from "../data/task";
import Utils from "./svg/utils/utils";

export default class Grid {
    notches: Map<number, number> = new Map();
    fullWidth: number = -1;
    private _holidays: Map<number, string> = new Map<number, string>();
    constructor(private parsedData: ParsedData, private conf: Config) {
        this.parseHolidays(conf.holidays)
    }

    calcNotches() {
        this.calcNotchesForTasks(this.parsedData.tasks);
        let sortedKeys: number[] = [];
        for (const k of this.notches.keys()) {
            sortedKeys.push(k);
        }
        sortedKeys.sort();
        sortedKeys = this.addMissingNotches(sortedKeys);
        this.notches.set(sortedKeys[0], 1);
        for (let i = 0; i < sortedKeys.length - 1; i++) {
            if (this.isWeekendOrHoliday(new Date(sortedKeys[i]))) {
                this.notches.set(sortedKeys[i+1], this.notches.get(sortedKeys[i]) as number + this.conf.taskHolidayWidth);
            }
            else {
                this.notches.set(sortedKeys[i+1], this.notches.get(sortedKeys[i]) as number + this.conf.taskDayWidth);
            }
        }
        this.fullWidth = this.notches.get(sortedKeys[sortedKeys.length - 1]) as number;
    }

    private calcNotchesForTasks(tasks: Task[]) {
        for (const t of tasks) {
            this.calcForTask(t);
            if (t.tasks.length) {
                this.calcNotchesForTasks(t.tasks as Task[]);
            }
        }
    }

    private calcForTask(t: Task) {
        let currentDay = t.start as Date;
        let duration = t.duration;
        while (true) {
            if (!this.notches.has(currentDay.getTime())) {
                this.notches.set(currentDay.getTime(), -1);
            }
            if (duration > 0) {
                currentDay = Utils.addDay(currentDay);
                if (!this.isWeekendOrHoliday(currentDay) || duration === 1) duration--;
            }
            else {
                t.end = currentDay;
                break;
            }
        }
    }

    isWeekendOrHoliday(date: Date) {
        for (const d of this.conf.weekEnds) {
            if (d === date.getDay()) return true;
        }
        return this._holidays.has(date.getTime());
    }

    private parseHolidays(holidays: { [p: string]: string }) {
        for (let date in holidays) {
            if (holidays.hasOwnProperty(date)) {
                this._holidays.set((new Date(date)).getTime(), holidays[date]);
            }
        }
    }

    private addMissingNotches(sortedKeys: number[]): number[] {
        const start = sortedKeys[0];
        const end = sortedKeys[sortedKeys.length - 1];
        const retVal: number[] = [start];
        let current = new Date(start);
        do {
             current = Utils.addDay(current);
             retVal.push(current.getTime());
        }
        while (current.getTime() < end);
        return retVal;
    }
}
