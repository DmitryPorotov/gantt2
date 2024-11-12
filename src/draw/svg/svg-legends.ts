import Grid from "../grid";
import {Config} from "../../config/config-parser";
import SVGElementWrapper from "./utils/svg-element-wrapper";
import Utils from "./utils/utils";

export default class SvgLegends {
    elem: SVGElementWrapper;
    constructor(private grid: Grid, private conf: Config) {
        this.elem = Utils.createElement('svg');
    }
    buildElem(): SVGElementWrapper {
        const monthStarts: {x: number, date: Date}[] = [];
        for (const d of this.grid.notches.keys()) {
            const date = new Date(d);
            if (date.getDate() == 1) {
                monthStarts.push({
                    x: this.grid.notches.get(d) as number,
                    date
                })
            }
            if (!this.grid.isWeekendOrHoliday(date)) {
                const text = Utils.createElement('text')
                    .setAttrib_('x', String(this.grid.notches.get(d)))
                    .setAttrib_('y', '30') as unknown as SVGTextElement;
                text.innerHTML = String(date.getDate());
                this.elem.appChild_(text);
            }
        }
        if (monthStarts.length) {
            for (const ms of monthStarts) {
                this.buildMonthLegend(ms.date, ms.x)
            }
        }
        else {
            const key = [...this.grid.notches.keys()][0];
            this.buildMonthLegend(new Date(key), key);
        }
        this.elem.setAttrib_('height', '40').setAttrib_('width', String(this.grid.fullWidth));
        return this.elem;
    }

    private buildMonthLegend(date: Date, x: number) {
        const text = Utils.createElement('text')
            .setAttrib_('x', String(this.grid.notches.get(x)))
            .setAttrib_('y', '14') as unknown as SVGTextElement;
        text.innerHTML = `${date.getMonth() + 1}/${date.getFullYear()}`;
        this.elem.appChild_(text);
    }
}
