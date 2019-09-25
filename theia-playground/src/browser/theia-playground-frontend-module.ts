/**
 * Generated using theia-extension-generator
 */

import { TheiaPlaygroundCommandContribution, TheiaPlaygroundMenuContribution } from './theia-playground-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { ContainerModule } from "inversify";
import { WidgetFactory } from '@theia/core/lib/browser';
import { DnDActivityWidget } from './dnd-activity-widget';

export default new ContainerModule(bind => {
    // add your contribution bindings here

    bind(CommandContribution).to(TheiaPlaygroundCommandContribution);
    bind(MenuContribution).to(TheiaPlaygroundMenuContribution);

    bind(DnDActivityWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => <WidgetFactory>{
        id: "",
        createWidget: () => {
            context.container.get<DnDActivityWidget>(DnDActivityWidget);
        }
    }).inSingletonScope();

});