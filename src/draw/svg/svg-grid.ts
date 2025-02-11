import {Grid} from "../grid";
import {Config} from "../..";
import {SVGElementWrapper} from "./utils/svg-element-wrapper";
import {Utils} from "./utils/utils";

export class SvgGrid {
    elem: SVGElementWrapper<'g'>;
    constructor(private grid: Grid, private totalHeight: number) {
        this.elem = Utils.createElement('g');
    }
    buildElem(conf: Config) {
        for (const n of this.grid.notches.keys()) {
            const date = new Date(n);
            const x = this.grid.notches.get(n);
            const line = Utils.createElement('path');
            if (this.grid.isWeekendOrHoliday(date)) {
                line.setAttrib_('fill', conf.gridHolidayColor)
                    .setAttrib_('d', `M${x} 0v${this.totalHeight}h${conf.taskHolidayWidth}v${-this.totalHeight}z`)
            }
            else {
                if (
                    (conf.timelineDayNumbersForWeekdays && conf.timelineDayNumbersForWeekdays.includes(date.getDay()))
                    || (conf.timelineDayNumbersForMonthDates && conf.timelineDayNumbersForMonthDates.includes(date.getDate()))
                    || !(conf.timelineDayNumbersForWeekdays || conf.timelineDayNumbersForMonthDates)
                ) {
                    line.setAttrib_('d', `M${x} 0L${x} ${this.totalHeight}`)
                        .setAttrib_('stroke', conf.gridLineColor)
                        .setAttrib_('stroke-width', '1');
                }
            }
            this.elem.appChild_(line);
        }
        if (conf.gridOpacity != 1) {
            this.elem.setAttrib_('opacity', String(conf.gridOpacity))
        }
        return this.elem;
    }
}
