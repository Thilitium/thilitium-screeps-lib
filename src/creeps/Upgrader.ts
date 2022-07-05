import { Gather, Harvest, Store } from "../Behaviors/behaviors";
import { Upgrade } from "../Behaviors/Creeps/Upgrade";

/**
 * Creep meant to upgrade the main controller of its own room by any means.
 * When controller is fully upgraded, it becomes a transporter.
 */
export class Upgrader {
    /** Upgrade / Gather / Harvest / Store */
    run(creep: Creep) {
        if (creep.memory.upgrading) creep.memory.upgrading = Upgrade.run(creep);
        if (!creep.memory.upgrading) creep.memory.upgrading = !(Gather.run(creep) || Harvest.run(creep) || Store.run(creep));
    }
}

declare global {
    interface CreepMemory {
        upgrading: boolean;
    }
}