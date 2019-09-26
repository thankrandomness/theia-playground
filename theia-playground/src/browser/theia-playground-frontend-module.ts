
import '../../src/browser/style/index.css';

import { TheiaPlaygroundCommandContribution, TheiaPlaygroundMenuContribution, TheiaPlaygroundFrontendApplicationContribution } from './theia-playground-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { ContainerModule } from "inversify";
import { WidgetFactory, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { DnDActivityWidget } from './dnd-activity-widget';
import { DnDService } from './dnd-service';

export default new ContainerModule(bind => {

    bind(CommandContribution).to(TheiaPlaygroundCommandContribution);
    bind(MenuContribution).to(TheiaPlaygroundMenuContribution);

    bind(DnDActivityWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(context => <WidgetFactory>{
        id: DnDActivityWidget.ID,
        createWidget: () => {
            return context.container.get<DnDActivityWidget>(DnDActivityWidget);
        }
    }).inSingletonScope();

    bind(FrontendApplicationContribution).to(TheiaPlaygroundFrontendApplicationContribution).inSingletonScope();

    bind(DnDService).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(DnDService);
});