import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus, FrontendApplicationContribution, ApplicationShell, WidgetManager } from "@theia/core/lib/browser";
import { DnDActivityWidget } from "./dnd-activity-widget";

export const TheiaPlaygroundCommand = {
    id: 'TheiaPlayground.command',
    label: "Shows a message"
};

@injectable()
export class TheiaPlaygroundCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(TheiaPlaygroundCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class TheiaPlaygroundMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: TheiaPlaygroundCommand.id,
            label: 'Say Hello'
        });
    }
}

@injectable()
export class TheiaPlaygroundFrontendApplicationContribution implements FrontendApplicationContribution {

    @inject(ApplicationShell)
    appShell: ApplicationShell;

    @inject(WidgetManager)
    widgetManager: WidgetManager;

    async initializeLayout() {
        const widget = await this.widgetManager.getOrCreateWidget(DnDActivityWidget.ID);
        await this.appShell.addWidget(widget, { area: 'left', rank: 1000 });
    }
}