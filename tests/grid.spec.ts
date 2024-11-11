import {it, describe, expect} from '@jest/globals'
import {tasks} from './mock-data/data1'
import {tasks2} from './mock-data/data2'
import DataParser from '../src/data/data-parser'
import ConfigParser from "../src/config/config-parser";
import Grid from "../src/draw/grid";

describe('grid', () => {
    it('should build the grid for the tasks', () => {
        const config = ConfigParser.parse({});
        DataParser.setConfig(config);
        const data = DataParser.parse(tasks2);
        const grid = new Grid(data, config);
        grid.calcNotches();
        expect(grid.notches.get(Math.max(...grid.notches.keys()))).toBe(417)
    })
});
