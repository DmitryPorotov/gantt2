import ConfigParser from './config/config-parser';
import {ITask} from "./data/task.interface";
import {IConfig} from "./config/config.interface";
import SvgRoot from "./draw/svg/svg-root";
import DataParser from "./data/data-parser";
import Grid from "./draw/grid";

export class Gantt2 {
    constructor(public elem: HTMLElement) {

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
        svg.setAttrib_("width", String(grid.fullWidth + parsedConfig.taskStrokeWidth))
            .setAttrib_('height', String(height + parsedConfig.taskStrokeWidth) );

        this.elem.appendChild(svg.element)
    }
}
