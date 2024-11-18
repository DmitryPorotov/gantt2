import {Dependency, Config, DependencyType} from "../..";
import {SvgTask} from "./svg-task";
import {Utils} from "./utils/utils";
import {SVGElementWrapper} from "./utils/svg-element-wrapper";

export class SvgDependency {
    constructor(private dependency: Dependency, private dependOnTask: SvgTask) {
    }

    buildElem(parentTask: SvgTask, conf: Config): SVGElementWrapper {
        let startX: number,
            endX: number,
            doHook = false;
        switch (this.dependency.type) {
            case (DependencyType.StartStart):
                startX = parentTask.getOffsetX();
                endX = this.dependOnTask.getOffsetX();
                doHook = startX <= endX;
                break;
            case (DependencyType.FinishStart):
                startX = parentTask.getEndX();
                endX = this.dependOnTask.getOffsetX();
                break;
            case (DependencyType.FinishFinish):
                startX = parentTask.getEndX();
                endX = this.dependOnTask.getEndX();
                doHook = startX >= endX;
                break;
            case (DependencyType.StartFinish):
                startX = parentTask.getOffsetX();
                endX = this.dependOnTask.getEndX();
                break;
        }
        return this.buildArrowLine(startX, endX, parentTask.getOffsetY(), this.dependOnTask.getOffsetY(), doHook, conf);
    }

    private buildArrowLine(startX: number, endX: number, parentOffsetY: number, dependOnOffsetY: number, doHook: boolean, conf: Config) {
        let line, arrowHead;
        const arrowG = Utils.createElement('g')
            .appChild_(
                line = Utils.createElement('path')
                    .setAttrib_('stroke', '#000')
                    .setAttrib_('stroke-width', String(conf.dependencyStrokeWidth))
                    .setAttrib_('fill-opacity', '0')
            )
            .appChild_(
                arrowHead = Utils.createElement('path')
                    .setAttrib_('stroke', '#000')
                    .setAttrib_('stroke-width', '1')
            ).setAttrib_('class', conf.dependencyCssClass);

        if (conf.dependencyOpacity !== 1) {
            arrowG.setAttrib_('opacity', String(conf.dependencyOpacity))
        }

        if ('Rubber' === this.dependency.hardness) {
            line.setAttrib_('stroke-dasharray', '5, 5');
        }

        const arrowSize = conf.dependencyArrowSize;
        const halfArrowSize = arrowSize / 2 + 1;
        let lineD = `M${startX} ${parentOffsetY + (conf.taskHeight / 2)}`,
            arrowHeadD: string,
            realEndX: number,
            realEndY: number,
            dir: number;
        if (doHook) {
            realEndX = endX + (this.dependency.type === DependencyType.StartStart ? -arrowSize : arrowSize);
            realEndY = dependOnOffsetY + (conf.taskHeight / 2);
            dir = this.dependency.type === DependencyType.StartStart ? 1 : -1;
            lineD += `h${this.dependency.type === DependencyType.StartStart ? -(arrowSize + 2) : arrowSize + 2}V${realEndY}H${realEndX}`;
            arrowHeadD = `v-${halfArrowSize}l${arrowSize * dir} ${halfArrowSize}l${-arrowSize * dir} ${halfArrowSize}z`;
        } else {
            realEndX = endX + (
                (
                    endX >= startX
                    || (endX < startX
                        && (
                            this.dependency.type === DependencyType.StartStart
                            || this.dependency.type === DependencyType.FinishStart
                        )
                    )
                ) ? arrowSize : -arrowSize);
            realEndY = dependOnOffsetY  + (dependOnOffsetY < parentOffsetY ? conf.taskHeight + conf.taskVPadding  + halfArrowSize: -(conf.taskVPadding + halfArrowSize));
            dir = dependOnOffsetY > parentOffsetY ? 1 : -1;
            lineD += `H${realEndX} V${realEndY}`;
            arrowHeadD = `h${halfArrowSize}l-${halfArrowSize} ${arrowSize * dir}l-${halfArrowSize} ${-arrowSize * dir}z`;
        }
        arrowHeadD = `M${realEndX} ${realEndY}` + arrowHeadD;
        line.setAttrib_('d', lineD);
        arrowHead.setAttrib_('d', arrowHeadD);
        return arrowG;
    }
}
