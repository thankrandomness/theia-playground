import * as React from 'react';
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";
import { postConstruct, injectable, inject } from "inversify";
import { Message } from '@phosphor/messaging';
import { DnDService } from './dnd-service';

@injectable()
export class DnDActivityWidget extends ReactWidget {

    static readonly ID = 'theia-playground:dnd-activity-widget';
    static readonly LABEL = 'DnDActivityWidget';

    @inject(DnDService)
    protected readonly dndService: DnDService;

    @postConstruct()
    protected async init(): Promise<void> {
        this.id = DnDActivityWidget.ID;
        this.title.label = DnDActivityWidget.LABEL;
        this.title.caption = DnDActivityWidget.LABEL;
        this.title.closable = true;
        this.title.iconClass = 'fa fa-cubes';
        this.update();
    }

    protected onActivateRequest(msg: Message): void {
        super.onActivateRequest(msg);
        this.node.focus();
    }

    protected get items(): { id: string, icon: string }[] {
        return [
            { id: "cube", icon: "fa-cube" },
            { id: "circle", icon: "fa-circle" },
            { id: "cloud", icon: "fa-cloud" },
            { id: "map", icon: "fa-map" },
        ]
    }

    protected render(): React.ReactNode {
        return <div id='playground-widget-container'>
            {this.items.map(({id, icon}) =>
                <div className="draggable" key={id} id={id} data-id={id} draggable={true} onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
                    <h1><i className={`fa ${icon}`} /></h1>
                </div>
            )}
        </div>
    }

    protected handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        if (event.target instanceof HTMLElement) {
            const id = this.findDraggableId(event.target);
            if (id) {
                this.dndService.dragStart(id)
            }
        }
    };
    protected handleDragEnd = (event: React.DragEvent<HTMLElement>) => {
        if (event.target instanceof HTMLElement) {
            const id = this.findDraggableId(event.target);
            if (id) {
                this.dndService.dragEnd(id)
            }
        }
    };
    protected findDraggableId(element: HTMLElement) {
        let draggable: HTMLElement | undefined;
        let candidate: HTMLElement | null = element;
        while (!draggable && candidate) {
            if (candidate.classList.contains("draggable")) {
                draggable = candidate;
                break;
            }
            candidate = candidate.parentElement;
        }
        if (draggable) {
            return draggable.dataset.id;
        }
    }
}