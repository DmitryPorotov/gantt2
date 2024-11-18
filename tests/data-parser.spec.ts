import {it, describe, expect} from '@jest/globals'
import {tasks} from './mock-data/data1'
import {tasks2} from './mock-data/data2'
import {DataParser, ConfigParser} from '../src'

describe('data parser', () => {
   it('should be able to parse a tasks array', () => {
        DataParser.setConfig(ConfigParser.parse({
            taskDefaultColor: '#8cb6ce'
        }));
       const t = DataParser.parse(tasks2);
       expect(t.tasks[0].totalDescendants).toBe(4)
   });
});
