import {ConfigParser ,IConfig} from './config/config-parser';
import {ITask} from "./data/task";
import {Grid} from "./draw";
import {DataParser, ParsedData} from "./data/data-parser";
import {SvgRoot} from "./draw/svg/svg-root";
import {SvgLegends} from "./draw/svg/svg-legends";

export class Gantt2 {
    private _totalHeight?: number;
    private _totalWidth?: number;
    private readonly container: HTMLDivElement;
    private _chartContainer?: HTMLDivElement;
    constructor(private elem: HTMLElement) {
        this.container = document.createElement('div');
        this.elem.appendChild(this.container);
        this.container.style.height = '100%';
        this.container.style.width = '100%';
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
        this._totalHeight = parsedData.total ? (parsedData.total * (parsedConfig.taskHeight + (2 * (parsedConfig.taskVPadding))) + parsedConfig.taskStrokeWidth) : this.container.offsetHeight;
        const grid = new Grid(parsedData, parsedConfig);
        grid.calcNotches();
        const svgRoot = new SvgRoot(grid, parsedConfig);
        const svg = svgRoot.buildElem(parsedData, this._totalHeight);
        this._totalWidth = grid.fullWidth + (parsedConfig.taskDayWidth / 2);
        svg.setAttrib_("width", String(this._totalWidth))
            .setAttrib_('height', String(this._totalHeight))
            .setAttrib_('style', 'display:block;');

        this._chartContainer = window.document.createElement('div');
        this._chartContainer.style.overflow = 'auto';
        this._chartContainer.style.height = 'calc(100% - 64px)';
        this._chartContainer.classList.add('gantt-chart-container');
        this._chartContainer.appendChild(svg.element);

        if (parsedConfig.showLegends) {
            const legends = new SvgLegends(grid, this._totalWidth, parsedConfig);
            this.container.appendChild(legends.buildElem());
            this._chartContainer.addEventListener('scroll', legends.scrollEventHandler);
        }

        this.container.appendChild(this._chartContainer);
        return parsedData;
    }

    setChartScrollEventHandler(evtHandler: (evt:Event) => void) {
        (this._chartContainer as HTMLDivElement).addEventListener('scroll', evtHandler)
    }

    setChartScroll(scrollTop: number) {
        (this._chartContainer as HTMLDivElement).scrollTop = scrollTop;
    }
}

export * from './config/config-parser';
export * from './data/data-parser';
export * from './data/dependency';
export * from './data/task';
export * from './draw'
