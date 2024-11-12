!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.gantt2=e():t.gantt2=e()}(self,(()=>(()=>{"use strict";var t={502:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{static parse(t){var e,s,i,n,a,r,d;return{taskDefaultColor:(null==t?void 0:t.taskDefaultColor)||"#8cb6ce",showTaskNames:null===(e=null==t?void 0:t.showTaskNames)||void 0===e||e,taskCssClass:(null==t?void 0:t.taskCssClass)||"gantt-task",taskStrokeColor:(null==t?void 0:t.taskStrokeColor)||"black",taskDayWidth:(null==t?void 0:t.taskDayWidth)||50,taskHeight:(null==t?void 0:t.taskHeight)||15,taskVPadding:null!==(s=null==t?void 0:t.taskVPadding)&&void 0!==s?s:8,taskStrokeWidth:null!==(i=null==t?void 0:t.taskStrokeWidth)&&void 0!==i?i:1,weekEnds:(null==t?void 0:t.weekEnds)||[0,6],taskHolidayWidth:null!==(n=null==t?void 0:t.taskHolidayWidth)&&void 0!==n?n:4,holidays:(null==t?void 0:t.holidays)||{},addTaskTitles:null===(a=null==t?void 0:t.addTaskTitles)||void 0===a||a,taskBorderRadius:this._parseTaskBorderRadius(null==t?void 0:t.taskBorderRadius),showGrid:null===(r=null==t?void 0:t.showGrid)||void 0===r||r,showLegends:null===(d=null==t?void 0:t.showLegends)||void 0===d||d,gridOpacity:(null==t?void 0:t.gridOpacity)||1}}static _parseTaskBorderRadius(t){if(null==t)return 0;if(!Array.isArray(t))return[t,t,t,t];if(t.length<2)throw new Error("taskBorderRadius array should have at least 2 elements");if(2==t.length)return[t[0],t[0],t[1],t[1]];if(3==t.length)return[t[0],t[1],t[2],0];if(t.length>3)return[t[0],t[1],t[2],t[3]];throw new Error("Can't parse taskBorderRadius")}}},170:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(9)),a=i(s(41));class r{static setConfig(t){r._config=t}static parse(t){const{tasks:e}=r._parseTasks(t);return{startDate:this._startDate,tasks:e,total:this._totalTasks}}static _parseTasks(t){var e,s,i,a;const d={tasks:[],numDescend:0};for(const o of t){this._totalTasks++;let{tasks:t,numDescend:l}=o.tasks?r._parseTasks(o.tasks):{tasks:[],numDescend:0};l+=o.tasks?o.tasks.length:0,d.numDescend+=l;const h=new n.default(o.id,o.name,new Date(o.start),new Date(0),o.duration,null!==(e=o.complete)&&void 0!==e?e:0,null!==(s=o.color)&&void 0!==s?s:r._config.taskDefaultColor,o.depend?r._parseDeps(o.depend):[],null===(i=o.expand)||void 0===i||i,null!==(a=o.meeting)&&void 0!==a&&a,t,l);this._startDate?h.start.getTime()<this._startDate.getTime()&&(this._startDate=h.start):this._startDate=h.start,d.tasks.push(h)}return d}static _parseDeps(t){var e;const s=[];for(const i of t)s.push(new a.default(i.id,i.type,null!==(e=i.difference)&&void 0!==e?e:0,i.hardness));return s}}r._totalTasks=0,e.default=r},515:(t,e)=>{var s;Object.defineProperty(e,"__esModule",{value:!0}),e.DependencyType=void 0,function(t){t[t.StartStart=1]="StartStart",t[t.FinishStart=2]="FinishStart",t[t.FinishFinish=3]="FinishFinish",t[t.StartFinish=4]="StartFinish"}(s||(e.DependencyType=s={}))},41:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s,i){this.id=t,this.type=e,this.difference=s,this.hardness=i}}},9:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s,i,n,a,r,d,o,l,h,c){this.id=t,this.name=e,this.start=s,this.end=i,this.duration=n,this.complete=a,this.color=r,this.depend=d,this.expand=o,this.meeting=l,this.tasks=h,this.totalDescendants=c}}},990:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(346));e.default=class{constructor(t,e){this.parsedData=t,this.conf=e,this.notches=new Map,this.fullWidth=-1,this._holidays=new Map,this.parseHolidays(e.holidays)}calcNotches(){this.calcNotchesForTasks(this.parsedData.tasks);let t=[];for(const e of this.notches.keys())t.push(e);t.sort(),t=this.addMissingNotches(t),this.notches.set(t[0],1);for(let e=0;e<t.length-1;e++)this.isWeekendOrHoliday(new Date(t[e]))?this.notches.set(t[e+1],this.notches.get(t[e])+this.conf.taskHolidayWidth):this.notches.set(t[e+1],this.notches.get(t[e])+this.conf.taskDayWidth);this.fullWidth=this.notches.get(t[t.length-1])}calcNotchesForTasks(t){for(const e of t)this.calcForTask(e),e.tasks.length&&this.calcNotchesForTasks(e.tasks)}calcForTask(t){let e=t.start,s=t.duration;for(;;){if(this.notches.has(e.getTime())||this.notches.set(e.getTime(),-1),!(s>0)){t.end=e;break}e=n.default.addDay(e),this.isWeekendOrHoliday(e)&&1!==s||s--}}isWeekendOrHoliday(t){for(const e of this.conf.weekEnds)if(e===t.getDay())return!0;return this._holidays.has(t.getTime())}parseHolidays(t){for(let e in t)t.hasOwnProperty(e)&&this._holidays.set(new Date(e).getTime(),t[e])}addMissingNotches(t){const e=t[0],s=t[t.length-1],i=[e];let a=new Date(e);do{a=n.default.addDay(a),i.push(a.getTime())}while(a.getTime()<s);return i}}},713:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=s(515),a=i(s(346));e.default=class{constructor(t,e){this.dependency=t,this.dependOnTask=e}buildElem(t,e){let s,i,a=!1;switch(this.dependency.type){case n.DependencyType.StartStart:s=t.getOffsetX(),i=this.dependOnTask.getOffsetX(),a=s<=i;break;case n.DependencyType.FinishStart:s=t.getEndX(),i=this.dependOnTask.getOffsetX();break;case n.DependencyType.FinishFinish:s=t.getEndX(),i=this.dependOnTask.getEndX(),a=s>=i;break;case n.DependencyType.StartFinish:s=t.getOffsetX(),i=this.dependOnTask.getEndX()}return this.buildArrowLine(s,i,t.getOffsetY(),this.dependOnTask.getOffsetY(),a,e)}buildArrowLine(t,e,s,i,r,d){let o,l;const h=a.default.createElement("g").appChild_(o=a.default.createElement("path").setAttrib_("stroke","#000").setAttrib_("stroke-width","1").setAttrib_("fill-opacity","0")).appChild_(l=a.default.createElement("path").setAttrib_("stroke","#000").setAttrib_("stroke-width","1")).setAttrib_("class","gantt-task-dependency");"Rubber"===this.dependency.hardness&&o.setAttrib_("stroke-dasharray","5, 5");let c,u,f,p,k=`M${t} ${s+d.taskHeight/2}`;return r?(u=e+(this.dependency.type===n.DependencyType.StartStart?-6:6),f=i+d.taskHeight/2,p=this.dependency.type===n.DependencyType.StartStart?1:-1,k+=`h${this.dependency.type===n.DependencyType.StartStart?-8:8}V${f}H${u}`,c=`v-3l${5*p} 3l${-5*p} 3z`):(u=e+(e>=t||e<t&&(this.dependency.type===n.DependencyType.StartStart||this.dependency.type===n.DependencyType.FinishStart)?3:-3),f=i+(i<s?d.taskHeight+d.taskVPadding:-d.taskVPadding),p=i>s?1:-1,k+=`H${u} V${f}`,c=`h3l-3 ${5*p}l-3 ${-5*p}z`),c=`M${u} ${f}`+c,o.setAttrib_("d",k),l.setAttrib_("d",c),h}}},572:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(346));e.default=class{constructor(t,e){this.grid=t,this.totalHeight=e,this.elem=n.default.createElement("g")}buildElem(t){for(const e of this.grid.notches.keys()){const s=new Date(e),i=this.grid.notches.get(e),a=n.default.createElement("path");this.grid.isWeekendOrHoliday(s)?a.setAttrib_("fill","#ccc").setAttrib_("d",`M${i} 0v${this.totalHeight}h${t.taskHolidayWidth}v${-this.totalHeight}z`):a.setAttrib_("d",`M${i} 0L${i} ${this.totalHeight}`).setAttrib_("stroke","#000").setAttrib_("stroke-width","1"),this.elem.appChild_(a)}return 1!=t.gridOpacity&&this.elem.setAttrib_("opacity",String(t.gridOpacity)),this.elem}}},992:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(346));e.default=class{constructor(t,e){this.grid=t,this.conf=e,this.elem=n.default.createElement("svg")}buildElem(){const t=[];for(const e of this.grid.notches.keys()){const s=new Date(e);if(1==s.getDate()&&t.push({x:this.grid.notches.get(e),date:s}),!this.grid.isWeekendOrHoliday(s)){const t=n.default.createElement("text").setAttrib_("x",String(this.grid.notches.get(e))).setAttrib_("y","30");t.innerHTML=String(s.getDate()),this.elem.appChild_(t)}}if(t.length)for(const e of t)this.buildMonthLegend(e.date,e.x);else{const t=[...this.grid.notches.keys()][0];this.buildMonthLegend(new Date(t),t)}return this.elem.setAttrib_("height","40").setAttrib_("width",String(this.grid.fullWidth)),this.elem}buildMonthLegend(t,e){const s=n.default.createElement("text").setAttrib_("x",String(this.grid.notches.get(e))).setAttrib_("y","14");s.innerHTML=`${t.getMonth()+1}/${t.getFullYear()}`,this.elem.appChild_(s)}}},328:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(346)),a=i(s(929)),r=i(s(713)),d=i(s(572));e.default=class{constructor(t,e){this.grid=t,this.conf=e,this.svgTasks=[],this.currentOffsetY=0,this.depsToDraw=[],this.currentOffsetY=e.taskVPadding*(e.showTaskNames?2:1)}buildElem(t){return this.elem=n.default.createElement("svg"),this.startDate=t.startDate,this.drawTasks(t.tasks),this.drawDependencies(),this.drawGrid(),this.elem}drawTasks(t){var e,s,i;for(const n of t){const t=new a.default(n),r=this.grid.notches.get(n.start.getTime()),d=this.grid.notches.get(n.end.getTime());if(t.setOffset(r,this.currentOffsetY),t.setEndX(d),null===(e=this.elem)||void 0===e||e.appChild_(t.buildElem(this.conf)),this.currentOffsetY+=this.conf.taskHeight+2*this.conf.taskVPadding,this.svgTasks.push(t),(null===(s=n.tasks)||void 0===s?void 0:s.length)&&this.drawTasks(n.tasks),null===(i=n.depend)||void 0===i?void 0:i.length)for(const e of n.depend)this.depsToDraw.push({dep:e,parent:t})}}drawDependencies(){var t;for(const e of this.depsToDraw){const s=new r.default(e.dep,this.findSvgTaskById(e.dep.id));null===(t=this.elem)||void 0===t||t.appChild_(s.buildElem(e.parent,this.conf))}}findSvgTaskById(t){for(const e of this.svgTasks)if(e.getId()===t)return e;throw new Error(`Task with id ${t} was not found.`)}drawGrid(){var t;if(!this.conf.showGrid)return;const e=this.svgTasks.length*(this.conf.taskHeight+2*this.conf.taskVPadding);this.svgGrid=new d.default(this.grid,e),null===(t=this.elem)||void 0===t||t.prepChild_(this.svgGrid.buildElem(this.conf))}}},929:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(346));e.default=class{constructor(t){this.task=t,this.offsetX=0,this.offsetY=0,this.endX=0}getOffsetX(){return this.offsetX}getOffsetY(){return this.offsetY}getEndX(){return this.endX}setEndX(t){this.endX=t}setOffset(t,e){this.offsetX=t,this.offsetY=e}getId(){return this.task.id}buildElem(t){this.elem=n.default.createElement("g").setAttrib_("class","gantt-task");const e=n.default.createElement("path").setAttrib_("fill",this.task.color);let s;if(this.task.tasks.length)e.setAttrib_("d",`M${this.offsetX} ${this.offsetY}H${this.endX}v${t.taskHeight/2+2}l-7 ${-t.taskHeight/2+2}H${this.offsetX+7}l-7 ${t.taskHeight/2-2}z`);else{if(e.setAttrib_("stroke",t.taskStrokeColor).setAttrib_("stroke-width",String(t.taskStrokeWidth)),t.taskBorderRadius){const s=t.taskBorderRadius,i=Math.min(s[0],t.taskHeight/2),n=Math.min(s[1],t.taskHeight/2),a=Math.min(s[2],t.taskHeight/2),r=Math.min(s[3],t.taskHeight/2);e.setAttrib_("d",`m${this.offsetX} ${this.offsetY+i}c0,0 0,${-i} ${i},${-i}H${this.endX-n}c0,0 ${n},0 ${n},${n}v${t.taskHeight-n-a}c0,0 0,${a} ${-a},${a}H${this.offsetX+r}c0,0 ${-r},0 ${-r},${-r}z`)}else e.setAttrib_("d",`m${this.offsetX} ${this.offsetY}H${this.endX}v${t.taskHeight}H${this.offsetX}z`);this.task.complete&&(s=n.default.createElement("path").setAttrib_("fill","black").setAttrib_("d",`M${this.offsetX} ${this.offsetY+t.taskHeight/2-1}h${(this.endX-this.offsetX)/100*this.task.complete}v3H${this.offsetX}z`))}if(this.elem.appChild_(e),t.showTaskNames&&this.addName(),t.addTaskTitles){const t=n.default.createElement("title");t.innerHTML=`${this.task.name}\n   Starts ${this.task.start.toLocaleString()}\n   Ends ${this.task.end.toLocaleString()}\n   Duration ${this.task.duration} work day(s)`,this.elem.appChild_(t)}return s&&this.elem.appChild_(s),this.elem}addName(){var t;const e=n.default.createElement("text").setAttrib_("class","gantt-task-name").setAttrib_("dx",String(this.offsetX)).setAttrib_("dy",String(this.offsetY-2));e.innerHTML=this.task.name,null===(t=this.elem)||void 0===t||t.appChild_(e)}}},490:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){return this.element=t,this.proxy=new Proxy(this,{get:(t,e)=>this.hasOwnProperty(e)?this[e]:this[e]?this[e].bind(this):t.element[e].bind(this.element),set:(t,e,s)=>(t.element[e]=s,!0)}),this.proxy}appChild_(t){return t instanceof SVGElement?this.element.appendChild(t):this.element.appendChild(t.element),this.proxy}prepChild_(t){return t instanceof SVGElement?this.element.insertBefore(t,this.element.childNodes[0]):this.element.insertBefore(t.element,this.element.childNodes[0]),this.proxy}setAttrib_(t,e){return this.element.setAttribute(t,e),this.proxy}rm_(){return this.element.remove(),this.proxy}addEvtListen_(t,e){return this.element.addEventListener(t,e),this.proxy}}},346:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const n=i(s(490));class a{static createElement(t){return new n.default(document.createElementNS(a.SVG_NS,t))}static addDay(t,e=1){const s=new Date(t.getTime());return s.setDate(s.getDate()+e),s}static calcDiffInDays(t,e){return Math.round((e.getTime()-t.getTime())/864e5)}}a.SVG_NS="http://www.w3.org/2000/svg",e.default=a},729:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Gantt2=void 0;const n=i(s(502)),a=i(s(328)),r=i(s(170)),d=i(s(990)),o=i(s(992));e.Gantt2=class{constructor(t){this.elem=t}init(t,e){const s=n.default.parse(e);r.default.setConfig(s);const i=r.default.parse(t),l=i.total*(s.taskHeight+2*s.taskVPadding),h=new d.default(i,s);h.calcNotches();const c=new a.default(h,s).buildElem(i);if(c.setAttrib_("width",String(h.fullWidth+s.taskStrokeWidth)).setAttrib_("height",String(l+s.taskStrokeWidth)).setAttrib_("style","display:block;"),s.showLegends){const t=new o.default(h,s);this.elem.appendChild(t.buildElem().setAttrib_("style","display:block;").element)}this.elem.appendChild(c.element)}}}},e={};function s(i){var n=e[i];if(void 0!==n)return n.exports;var a=e[i]={exports:{}};return t[i].call(a.exports,a,a.exports,s),a.exports}var i={};return(()=>{var t=i;Object.defineProperty(t,"__esModule",{value:!0});const e=s(729),n=document.getElementById("chart1");new e.Gantt2(n).init([{id:0,name:"do things",complete:7,start:"2018-02-02",duration:4,tasks:[{id:1,name:"Do more things",color:"#ff6666",complete:21,start:"2018-02-02",duration:2,depend:[{id:2,type:2,difference:0,hardness:"Strong"},{id:5,type:2,difference:0,hardness:"Rubber"}]},{id:2,name:"task_2",complete:0,color:"#8cb6ce",start:"2018-02-06",duration:2,tasks:[{id:7,name:"task_6",complete:0,start:"2018-02-06",duration:1,depend:[{id:11,type:2,difference:0,hardness:"Strong"}]},{id:11,name:"task_10",complete:0,start:"2018-02-07",duration:1}]}]},{id:5,name:"task_5",complete:0,color:"#8cb6ce",start:"2018-02-06",duration:1,depend:[{id:11,type:2,difference:0,hardness:"Strong"},{id:19,type:2,difference:2,hardness:"Strong"}]},{id:19,name:"task_19",complete:0,color:"#8cb6ce",start:"2018-02-09",duration:1},{id:21,name:"task_21",complete:0,start:"2018-02-05",duration:2,depend:[{id:23,type:3,difference:0,hardness:"Strong"}]},{id:23,name:"task_23",complete:0,start:"2018-02-06",duration:1},{id:41,name:"task_41",complete:0,start:"2018-02-05",duration:1,depend:[{id:42,type:4,difference:0,hardness:"Strong"}]},{id:42,name:"task_42",complete:0,start:"2018-02-02",duration:1},{id:45,name:"task_45",complete:0,start:"2018-02-05",duration:1,depend:[{id:46,type:1,difference:6,hardness:"Strong"}]},{id:46,name:"task_46",complete:0,start:"2018-02-13",duration:1}])})(),i})()));