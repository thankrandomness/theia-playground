import * as React from 'react';
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { postConstruct } from "inversify";

export class DnDActivityWidget extends ReactWidget {

    static readonly ID = 'theia-playground:dnd-activity-widget';
    static readonly LABEL = 'DnDActivityWidget';

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = DnDActivityWidget.ID;
        this.title.label = DnDActivityWidget.LABEL;
        this.title.caption = DnDActivityWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-cubes';
        this.update();
    }

    protected render() {
        return <div></div>;
    }

}