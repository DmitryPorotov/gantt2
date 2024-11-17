import {Gantt2} from '../src'
import {ITask} from "../src/data/task.interface";
import {IConfig} from "../src/config/config.interface";


const menuButton = document.querySelector('.menu-button') as HTMLDivElement;
const navMenu = document.querySelector('.header-content nav') as HTMLDivElement;
menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('hide');
    menuButton.classList.toggle('open');
});

const navs = window.document.querySelectorAll('a[href^="#"]');
for (const n of navs) {
    n.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        const el = evt.target as HTMLAnchorElement;
        const id = el.href.split('#')[1];
        const navTarget = window.document.getElementById(id);
        if (navTarget) navTarget.scrollIntoView({ behavior: "smooth", inline: "nearest" });

        navMenu.classList.add('hide');
        menuButton.classList.remove('open');
    })
}

const elem = document.getElementById('chart1');
const gantt = new Gantt2(elem as HTMLElement);
const data: ITask[] = [
    {
        id: 0,
        name: 'do things',
        complete: 7,
        start: '2018-02-02',
        duration: 4,
        tasks: [
            {
                id: 1,
                name: 'Do more things',
                color: '#ff6666',
                complete: 21,
                start: '2018-02-02',
                duration: 2,
                depend: [
                    {
                        id: 2,
                        type: 2,
                        difference: 0,
                        hardness: 'Strong'
                    },
                    {
                        id: 5,
                        type: 2,
                        difference: 0,
                        hardness: 'Rubber'
                    }
                ],
            },
            {
                id: 2,
                name: 'task_2',
                complete: 0,
                color: '#8cb6ce',
                start: '2018-02-06',
                duration: 2,
                tasks: [
                    {
                        id: 7,
                        name: 'task_6',
                        complete: 0,
                        start: '2018-02-06',
                        duration: 1,
                        depend: [
                            {
                                id: 11,
                                type: 2,
                                difference: 0,
                                hardness: 'Strong'
                            }
                        ]


                    },
                    {
                        id: 11,
                        name: 'task_10',
                        complete: 0,
                        start: '2018-02-07',
                        duration: 1
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        name: 'task_5',
        complete: 0,
        color: '#8cb6ce',
        start: '2018-02-06',
        duration: 1,
        depend: [
            {
                id: 11,
                type: 2,
                difference: 0,
                hardness: 'Strong'
            },
            {
                id: 19,
                type: 2,
                difference: 2,
                hardness: 'Strong'
            }
        ]
    },
    {
        id: 19,
        name: 'task_19',
        complete: 0,
        color: '#8cb6ce',
        start: '2018-02-09',
        duration: 1
    },
    {
        id: 21,
        name: 'task_21',
        complete: 0,
        start: '2018-02-05',
        duration: 2,
        depend: [
            {
                id: 23,
                type: 3,
                difference: 0,
                hardness: 'Strong'
            }
        ]
    },
    {
        id: 23,
        name: 'task_23',
        complete: 0,
        start: '2018-02-06',
        duration: 1
    },
    {
        id: 41,
        name: 'task_41',
        complete: 0,
        start: '2018-02-05',
        duration: 1,
        depend: [
            {
                id: 42,
                type: 4,
                difference: 0,
                hardness: 'Strong'
            }
        ]
    },
    {
        id: 42,
        name: 'task_42',
        complete: 0,
        start: '2018-02-02',
        duration: 1
    },
    {
        id: 45,
        name: 'task_45',
        complete: 0,
        start: '2018-02-05',
        duration: 1,
        depend: [
            {
                id: 46,
                type: 1,
                difference: 6,
                hardness: 'Strong'
            }
        ]
    },
    {
        id: 46,
        name: 'task_46',
        complete: 0,
        start: '2018-02-13',
        duration: 1
    },
];

gantt.init(data);

const elem2 = document.getElementById('chart2');
const gantt2 = new Gantt2(elem2 as HTMLElement);
const config: IConfig = {
    gridOpacity: .3,
    taskBorderRadius: [5,10,10,5],
    taskDefaultColor: 'purple',
    taskHeight: 20,
    taskDayWidth: 60,
    taskVPadding: 10,
    taskStrokeWidth: 2
};

gantt2.init(data, config);

