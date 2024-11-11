import Task from "../../data/task";
import {IConfig} from "../../config/config.interface";
import SVGElementWrapper from "./utils/svg-element-wrapper";
import Utils from "./utils/utils";

export default class SvgTask {
    private elem?: SVGElementWrapper;
    constructor(private task: Task) {
    }

    private offsetX: number = 0;
    private offsetY: number = 0;
    private endX: number = 0;

    setEndX(val: number) {
        this.endX = val;
    }

    setOffset(x: number, y: number) {
        this.offsetX = x;
        this.offsetY = y;
    }

    buildElem(conf: IConfig): SVGElementWrapper {
        this.elem = Utils.createElement("g").setAttrib_('class', 'gantt-task');
        const task = Utils.createElement('path')
            .setAttrib_('fill', this.task.color);
        if (this.task.tasks.length) {
            task.setAttrib_('d',
                `M${this.offsetX} ${this.offsetY}H${this.endX}v12l-7 -7`
                + `L${this.offsetX + 7} ${this.offsetY + 5}l-7 7z`);
        }
        else {
            task.setAttrib_('stroke', conf.taskStrokeColor as string)
                .setAttrib_('stroke-width', String(conf.taskStrokeWidth as number))
                .setAttrib_('d', `m${this.offsetX} ${this.offsetY}H${this.endX}v${conf.taskHeight}H${this.offsetX}z`);
        }
        this.elem.appChild_(task);
        if (conf.showTaskNames) {
            this.addName();
        }
        return this.elem;
    }

    private addName() {
        const text: SVGTextElement = Utils.createElement('text')
            .setAttrib_('class', 'gantt-task-name')
            .setAttrib_('dx', String(this.offsetX))
            .setAttrib_('dy', String(this.offsetY -2)) as unknown as SVGTextElement;
        text.innerHTML = this.task.name;
        this.elem?.appChild_(text);
    }
}
