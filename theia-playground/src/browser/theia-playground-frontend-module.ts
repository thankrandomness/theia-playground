/**
 * Generated using theia-extension-generator
 */

import { TheiaPlaygroundCommandContribution, TheiaPlaygroundMenuContribution } from './theia-playground-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(TheiaPlaygroundCommandContribution);
    bind(MenuContribution).to(TheiaPlaygroundMenuContribution);
    
});