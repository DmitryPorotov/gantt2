import {SVGElementWrapper} from "./utils/svg-element-wrapper";
import {Utils} from "./utils/utils";
import {ParsedData, Dependency, Config, Task} from "../..";
import {SvgTask} from "./svg-task";
import {Grid} from "../grid";
import {SvgDependency} from "./svg-dependency";
import {SvgGrid} from "./svg-grid";

export class SvgRoot {
    private elem?: SVGElementWrapper;
    private svgTasks: SvgTask[] = [];
    private svgGrid?: SvgGrid;
    private currentOffsetY: number = 0;
    private startDate?: Date;
    private depsToDraw: {parent: SvgTask, dep: Dependency}[] = [];
    constructor(private grid: Grid,private conf: Config) {
        this.currentOffsetY = conf.taskVPadding * (conf.showTaskNames ? 2 : 1);
    }
    buildElem(data: ParsedData): SVGElementWrapper {
        this.elem = Utils.createElement("svg");
        this.startDate = data.startDate;
        this.drawTasks(data.tasks);
        this.drawDependencies();
        this.drawGrid();
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
            this.svgTasks.push(svgTask);
            if (t.tasks?.length) {
                this.drawTasks(t.tasks as Task[]);
            }
            if (t.depend?.length) {
                for (const d of t.depend) {
                    this.depsToDraw.push({
                        dep: d,
                        parent: svgTask
                    })
                }
            }
        }
    }

    private drawDependencies() {
        for (const dp of this.depsToDraw) {
            const dep = new SvgDependency(dp.dep, this.findSvgTaskById(dp.dep.id));
            this.elem?.appChild_(dep.buildElem(dp.parent, this.conf));
        }
    }

    private findSvgTaskById (id: number): SvgTask {
        for (const t of this.svgTasks) {
            if (t.getId() === id) {
                return t;
            }
        }
        throw new Error(`Task with id ${id} was not found.`);
    }

    private drawGrid() {
        if (!this.conf.showGrid) return;
        const height = this.svgTasks.length * (this.conf.taskHeight + (2 * (this.conf.taskVPadding)));
        this.svgGrid = new SvgGrid(this.grid, height);
        this.elem?.prepChild_(this.svgGrid.buildElem(this.conf));
    }
}
