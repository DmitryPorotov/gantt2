import {Grid} from "../grid";
import {Config} from "../..";
import {SVGElementWrapper} from "./utils/svg-element-wrapper";
import {Utils} from "./utils/utils";

export class SvgLegends {
    elem: SVGElementWrapper;
    constructor(private grid: Grid, private width: number, private conf: Config) {
        this.elem = Utils.createElement('svg');
    }
    buildElem(): SVGElementWrapper {
        const monthStarts: {x: number, date: Date}[] = [];
        for (const d of this.grid.notches.keys()) {
            const date = new Date(d);
            if (date.getDate() == 1) {
                monthStarts.push({
                    x: date.getTime(),
                    date
                })
            }
            if (
                (this.conf.timelineDayNumbersForWeekdays && this.conf.timelineDayNumbersForWeekdays.includes(date.getDay()))
                || (this.conf.timelineDayNumbersForMonthDates && this.conf.timelineDayNumbersForMonthDates.includes(date.getDate()))
                || (!this.conf.timelineDayNumbersForWeekdays && !this.conf.timelineDayNumbersForMonthDates && !this.grid.isWeekendOrHoliday(date))
            ) {
                const text = Utils.createElement('text')
                    .setAttrib_('x', String(this.grid.notches.get(d)))
                    .setAttrib_('y', `${this.conf.timelineLegendHeight - 10}`) as unknown as SVGTextElement;
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
        this.elem.setAttrib_('height', String(this.conf.timelineLegendHeight))
            .setAttrib_('width', String(this.width))
            .setAttrib_('class', this.conf.timelineLegendCssClass);
        return this.elem;
    }

    private buildMonthLegend(date: Date, x: number) {
        const text = Utils.createElement('text')
            .setAttrib_('font-weight',"bold")
            .setAttrib_('x', String(this.grid.notches.get(x)))
            .setAttrib_('y', String(this.conf.timelineLegendHeight/3)) as unknown as SVGTextElement;
        text.innerHTML = `${date.getMonth() + 1}/${date.getFullYear()}`;
        this.elem.appChild_(text);
    }
}
