import {Config, ParsedData, Task} from "..";
import {Utils} from "./svg/utils/utils";

export class Grid {
    notches: Map<number, number> = new Map();
    fullWidth: number = -1;
    private _holidays: Map<number, string> = new Map<number, string>();
    constructor(private parsedData: ParsedData, private conf: Config) {
        this.parseHolidays(conf.holidays)
    }

    calcNotches() {
        if (this.parsedData.tasks.length) {
            this.calcNotchesForTasks(this.parsedData.tasks);
        }
        else {
            const now = new Date();
            const today = new Date(`${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`);
            this.calcNotchesForTasks([new Task(1, '', today, Utils.addDay(today, 10), 10, 0, '', [], true, false, [], 0)]);
        }
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
        let daysToAdd = 0;
        while (duration > 0) {
            if (!this.notches.has(currentDay.getTime())) {
                this.notches.set(currentDay.getTime(), -1);
            }
            let nextDay = Utils.addDay(currentDay);
            if (!this.notches.has(nextDay.getTime())) {
                this.notches.set(nextDay.getTime(), -1);
            }
            if (this.isWeekendOrHoliday(currentDay))
                daysToAdd++;
            else {
                duration--;
            }
            currentDay = Utils.addDay(currentDay);
        }
        t.end = Utils.addDay(t.start as Date, t.duration + daysToAdd)
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
