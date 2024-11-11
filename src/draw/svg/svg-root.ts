import SVGElementWrapper from "./utils/svg-element-wrapper";
import Utils from "./utils/utils";
import Task from "../../data/task";
import {ParsedData} from "../../data/data-parser";
import SvgTask from "./svg-task";
import {Config} from "../../config/config-parser";
import Grid from "../grid";
import {IDependency} from "../../data/dependency.interface";

export default class SvgRoot {
    private elem?: SVGElementWrapper;
    private tasks: SvgTask[] = [];
    private currentOffsetY: number = 0;
    private startDate?: Date;
    constructor(private grid: Grid,private conf: Config) {
        this.currentOffsetY = conf.taskVPadding * (conf.showTaskNames ? 2 : 1);
    }
    buildElem(data: ParsedData): SVGElementWrapper {
        this.elem = Utils.createElement("svg");
        this.startDate = data.startDate;
        this.drawTasks(data.tasks);
        return this.elem;
    }

    private drawTasks(tasks: Task[]) {
        for (const t of tasks) {
            const svgTask = new SvgTask(t);
            const offsetX = this.grid.notches.get((t.start as Date).getTime()) as number;
            const endX = this.grid.notches.get((t.end as Date).getTime()) as number;
            svgTask.setOffset(offsetX, this.currentOffsetY);
            svgTask.setEndX(endX);
            this.elem?.appChild_(svgTask.buildElem(this.conf));
            this.currentOffsetY += this.conf.taskHeight + (2 * this.conf.taskVPadding);
            this.tasks.push(svgTask);
            if (t.tasks?.length) {
                this.drawTasks(t.tasks as Task[]);
            }
            if (t.depend?.length) {
                this.drawDependencies(t.depend)
            }
        }
    }

    private drawDependencies(depend: IDependency[]) {

    }
}
