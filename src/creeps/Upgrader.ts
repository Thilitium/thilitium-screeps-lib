import * as Behavior from '../Behaviors/Creeps';

/**
 * Creep meant to upgrade the main controller of its own room by any means.
 * When controller is fully upgraded, it becomes a transporter.
 */
export class Upgrader {
    /** Upgrade / Gather / Harvest / Store */
    static run(creep: Creep) {
        if (creep.memory.upgrading) creep.memory.upgrading = Behavior.Upgrade.run(creep);
        if (!creep.memory.upgrading) creep.memory.upgrading = 
            !(Behavior.Gather.run(creep) || Behavior.Harvest.run(creep) || Behavior.Store.run(creep));
    }
}

declare global {
    interface CreepMemory {
        upgrading: boolean;
    }
}