import SVGElementWrapper from "./svg-element-wrapper";

export type SvgElementName = "svg" | "g" | "text" | "path";

export default class Utils {
    public static SVG_NS: 'http://www.w3.org/2000/svg' = 'http://www.w3.org/2000/svg';

    public static createElement(name: SvgElementName): SVGElementWrapper {
        return new SVGElementWrapper(document.createElementNS(Utils.SVG_NS, name));
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
