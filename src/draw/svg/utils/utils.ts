import {SVGElementWrapper} from "./svg-element-wrapper";
import {SvgElements} from "./svg-elements";


export class Utils {
    public static SVG_NS: 'http://www.w3.org/2000/svg' = 'http://www.w3.org/2000/svg';

    public static createElement<K extends string & keyof SvgElements>(name: K): SVGElementWrapper<K> & SvgElements[K] {
        return new SVGElementWrapper(document.createElementNS(Utils.SVG_NS, name)) as SVGElementWrapper<K> & SvgElements[K];
    }

    public static addDay(date: Date, numDays = 1): Date {
        const d = new Date(date.getTime());
        d.setDate(d.getDate() + numDays);
        return d;
    }

    public static calcDiffInDays(date1: Date, date2: Date): number {
        return Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
    }
}
