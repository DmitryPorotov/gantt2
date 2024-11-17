import {IDependency} from "./dependency";

export interface ITask {
    id: number;
    name: string;
    complete?: number;
    color?: string;
    meeting?: boolean;
    expand?: boolean;
    start: Date | string;
    duration: number;
    tasks?: ITask[];
    depend?: IDependency[];
    totalDescendants?: number;
}


export class Task implements ITask {
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
