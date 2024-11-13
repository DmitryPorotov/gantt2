import Task from "../../data/task";
import SVGElementWrapper from "./utils/svg-element-wrapper";
import Utils from "./utils/utils";
import {Config} from "../../config/config-parser";

export default class SvgTask {
    private elem?: SVGElementWrapper;
    constructor(private task: Task) {
    }

    private offsetX: number = 0;
    private offsetY: number = 0;
    private endX: number = 0;

    getOffsetX() {
        return this.offsetX;
    }

    getOffsetY() {
        return this.offsetY;
    }

    getEndX() {
        return this.endX;
    }

    setEndX(val: number) {
        this.endX = val;
    }

    setOffset(x: number, y: number) {
        this.offsetX = x;
        this.offsetY = y;
    }

    getId() {
        return this.task.id
    }

    buildElem(conf: Config): SVGElementWrapper {
        this.elem = Utils.createElement("g").setAttrib_('class', conf.taskCssClass);
        const task = Utils.createElement('path')
            .setAttrib_('fill', this.task.color);
        let completion;
        if (this.task.tasks.length) {
            task.setAttrib_('d',
                `M${this.offsetX} ${this.offsetY}H${this.endX}v${conf.taskHeight/2 + 2}l-7 ${-conf.taskHeight/2 + 2}`
                + `H${this.offsetX + 7}l-7 ${conf.taskHeight/2 -2}z`);
        }
        else {
            task.setAttrib_('stroke', conf.taskStrokeColor as string)
                .setAttrib_('stroke-width', String(conf.taskStrokeWidth as number));
            if (conf.taskBorderRadius) {
                const br = conf.taskBorderRadius as number[];
                const brTL = Math.min(br[0], conf.taskHeight / 2),
                    brTR = Math.min(br[1], conf.taskHeight / 2),
                    brBR = Math.min(br[2], conf.taskHeight / 2),
                    brBL = Math.min(br[3], conf.taskHeight / 2);
                task.setAttrib_('d',
                    `m${this.offsetX} ${this.offsetY + brTL}c0,0 0,${-brTL} ${brTL},${-brTL}H${this.endX - brTR}c0,0 ${brTR},0 ${brTR},${brTR}v${conf.taskHeight - brTR - brBR}c0,0 0,${brBR} ${-brBR},${brBR}H${this.offsetX + brBL}c0,0 ${-brBL},0 ${-brBL},${-brBL}z`)
            }
            else {
                task.setAttrib_('d', `m${this.offsetX} ${this.offsetY}H${this.endX}v${conf.taskHeight}H${this.offsetX}z`);
            }
            if (this.task.complete) {
                completion = Utils.createElement('path')
                    .setAttrib_('fill', 'black')
                    .setAttrib_('d',
                        `M${this.offsetX} ${this.offsetY + (conf.taskHeight / 2) - 1}`
                        + `h${(this.endX - this.offsetX) / 100 * this.task.complete}v3H${this.offsetX}z`);
            }
        }
        this.elem.appChild_(task);
        if (conf.showTaskNames) {
            this.addName();
        }
        if (conf.addTaskTitles) {
            const title = Utils.createElement("title") as unknown as SVGTitleElement;
            title.innerHTML = `${this.task.name}
   Starts ${this.task.start.toLocaleString()}
   Ends ${Utils.addDay(this.task.end, -1).toLocaleString()}
   Duration ${this.task.duration} work day(s)`;
            this.elem.appChild_(title)
        }
        if (completion) {
            this.elem.appChild_(completion)
        }
        return this.elem;
    }

    private addName() {
        const text: SVGTextElement = Utils.createElement('text')
            .setAttrib_('class', 'gantt-task-name')
            .setAttrib_('dx', String(this.offsetX))
            .setAttrib_('dy', String(this.offsetY -4)) as unknown as SVGTextElement;
        text.innerHTML = this.task.name;
        this.elem?.appChild_(text);
    }
}
