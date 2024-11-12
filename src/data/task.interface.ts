import {IDependency} from "./dependency.interface";

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
