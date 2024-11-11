import {ITask} from "./task.interface";
import Task from "./task";
import {IDependency} from "./dependency.interface";
import Dependency from "./dependency";
import {Config} from "../config/config-parser";

export interface ParsedData {
    tasks: Task[]
    total: number
    startDate: Date
}

export default class DataParser {
    private static _config: Config;
    private static _totalTasks: number = 0;
    private static _startDate: Date;

    static setConfig(config: Config) {
        DataParser._config = config;
    }

    static parse(tasks: ITask[]): ParsedData {
        const {tasks: t} = DataParser._parseTasks(tasks);
        return {
            startDate: this._startDate,
            tasks: t,
            total: this._totalTasks
        };
    }

    private  static _parseTasks(tasks: ITask[]): {tasks: Task[], numDescend: number} {
        const retVal: {
            tasks: Task[],
            numDescend: number
        } = {
            tasks: [],
            numDescend: 0
        };
        for (const task of tasks) {
            this._totalTasks++;
            let { tasks: t, numDescend} = task.tasks ? DataParser._parseTasks(task.tasks) : { tasks: [], numDescend: 0 };
            numDescend += (task.tasks ? task.tasks.length : 0);
            retVal.numDescend += numDescend;
            const inst = new Task(
                task.id,
                task.name,
                new Date(task.start),
                new Date(0),
                task.duration,
                task.complete ?? 0,
                task.color ?? DataParser._config.taskDefaultColor as string,
                task.depend ? DataParser._parseDeps(task.depend) : [],
                task.expand ?? true,
                task.meeting ?? false,
                t,
                numDescend
            );
            if (!this._startDate) this._startDate = inst.start as Date;
            else if ((inst.start as Date).getTime() < this._startDate.getTime()) this._startDate = inst.start as Date;

            retVal.tasks.push(inst)
        }
        return retVal
    }

    private static _parseDeps(deps: IDependency[]): Dependency[] {
        const retVal = [];
        for (const dep of deps) {
            retVal.push(new Dependency(
                dep.id,
                dep.type,
                dep.difference ?? 0,
                dep.hardness
            ))
        }
        return  retVal;
    }
}
