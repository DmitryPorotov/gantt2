import {ITask} from "./task.interface";
import {IDependency} from "./dependency.interface";

export default class Task implements ITask {
    constructor(
        public id: number,
        public name: string,
        public start: Date | string,
        public end: Date,
        public duration: number,
        public complete: number,
        public color: string,
        public depend: IDependency[],
        public expand: boolean,
        public meeting: boolean,
        public tasks: ITask[],
        public totalDescendants: number,
    ) {
    }
}
