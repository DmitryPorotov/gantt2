import ConfigParser, {IConfig} from './config/config-parser';
import {ITask} from "./data/task";
import SvgRoot from "./draw/svg/svg-root";
import DataParser from "./data/data-parser";
import Grid from "./draw/grid";
import SvgLegends from "./draw/svg/svg-legends";

export class Gantt2 {
    constructor(private elem: HTMLElement) {

    }

    init(data: ITask[], config?: IConfig) {
        const parsedConfig = ConfigParser.parse(config);
        DataParser.setConfig(parsedConfig);
        const parsedData = DataParser.parse(data);
        const height = parsedData.total * (parsedConfig.taskHeight + (2 * (parsedConfig.taskVPadding)));
        const grid = new Grid(parsedData, parsedConfig);
        grid.calcNotches();
        const svgRoot = new SvgRoot(grid, parsedConfig);
        const svg = svgRoot.buildElem(parsedData);
        const width = grid.fullWidth + (parsedConfig.taskDayWidth / 2);
        svg.setAttrib_("width", String(width))
            .setAttrib_('height', String(height + parsedConfig.taskStrokeWidth))
            .setAttrib_('style', 'display:block;');
        if (parsedConfig.showLegends) {
            const legends = new SvgLegends(grid, width, parsedConfig);
            this.elem.appendChild(legends.buildElem().setAttrib_('style', 'display:block;').element)
        }
        this.elem.appendChild(svg.element)
    }
}

export * from './config/config-parser';
export * from './data/data-parser';
export * from './data/dependency';
export * from './data/task';
