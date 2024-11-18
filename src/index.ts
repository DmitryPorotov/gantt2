import {ConfigParser ,IConfig} from './config/config-parser';
import {ITask} from "./data/task";
import {Grid} from "./draw";
import {DataParser, ParsedData} from "./data/data-parser";
import {SvgRoot} from "./draw/svg/svg-root";
import {SvgLegends} from "./draw/svg/svg-legends";

export class Gantt2 {
    private _totalHeight?: number;
    private _totalWidth?: number;
    constructor(private elem: HTMLElement) {

    }

    getTotalHeight(): number {
        if (this._totalHeight == null) throw new Error('TotalHeight is still undefined.');
        return this._totalHeight;
    }

    getTotalWidth(): number {
        if (this._totalWidth == null) throw new Error('TotalWidth is still undefined.');
        return this._totalWidth;
    }

    init(data: ITask[], config?: IConfig): ParsedData {
        const parsedConfig = ConfigParser.parse(config);
        DataParser.setConfig(parsedConfig);
        const parsedData = DataParser.parse(data);
        this._totalHeight = parsedData.total * (parsedConfig.taskHeight + (2 * (parsedConfig.taskVPadding))) + parsedConfig.taskStrokeWidth;
        const grid = new Grid(parsedData, parsedConfig);
        grid.calcNotches();
        const svgRoot = new SvgRoot(grid, parsedConfig);
        const svg = svgRoot.buildElem(parsedData);
        this._totalWidth = grid.fullWidth + (parsedConfig.taskDayWidth / 2);
        svg.setAttrib_("width", String(this._totalWidth))
            .setAttrib_('height', String(this._totalHeight))
            .setAttrib_('style', 'display:block;');
        if (parsedConfig.showLegends) {
            const legends = new SvgLegends(grid, this._totalWidth, parsedConfig);
            this.elem.appendChild(legends.buildElem().setAttrib_('style', 'display:block;').element)
        }
        this.elem.appendChild(svg.element);
        return parsedData;
    }
}

export * from './config/config-parser';
export * from './data/data-parser';
export * from './data/dependency';
export * from './data/task';
export * from './draw'
