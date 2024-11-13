import {Gantt2} from "../src";
import {tasks2} from "./mock-data/data2";
import {tasks} from "./mock-data/data1";

const chart = new Gantt2(document.getElementById('chart') as HTMLElement);
chart.init(tasks,{
    showTaskNames: true,
    taskStrokeWidth: 1,
    taskHeight: 30,
    taskDayWidth: 20,
    taskVPadding: 15,
    addTaskTitles: true,
    taskBorderRadius: 0,
    showGrid: true,
    showLegends: true,
    // weekEnds: [0]
    dependencyOpacity: .4,
    dependencyStrokeWidth: 2,
    dependencyArrowSize: 12,
    timelineLegendHeight: 60,
    // timelineDayNumbersForWeekdays: [1],
    timelineDayNumbersForMonthDates: [1, 15]
});
