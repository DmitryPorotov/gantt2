export enum DependencyType {
    StartStart = 1,
    FinishStart,
    FinishFinish,
    StartFinish,
}

export interface IDependency {
    id: number;
    type: DependencyType; // 1 - start-start, 2 - start-finish, 3 - finish - finish, 4 finish-start
    difference: number;
    hardness: HardnessType;
}

export type HardnessType = 'Rubber' | 'Strong';


export class Dependency implements IDependency {
    constructor(
        public id: number,
        public type: DependencyType,
        public difference: number,
        public hardness: HardnessType,
    ) {
    }
}
