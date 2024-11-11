import {DependencyType} from "./dependency-type.enum";

export interface IDependency {
    id: number;
    type: DependencyType; // 1 - start-start, 2 - start-finish, 3 - finish - finish, 4 finish-start
    difference: number;
    hardness: HardnessType;
}

export type HardnessType = 'Rubber' | 'Strong';
