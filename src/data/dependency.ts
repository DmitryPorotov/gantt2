import {HardnessType, IDependency} from "./dependency.interface";
import {DependencyType} from "./dependency-type.enum";

export default class Dependency implements IDependency {
    constructor(
        public id: number,
        public type: DependencyType,
        public difference: number,
        public hardness: HardnessType,
    ) {
    }
}
