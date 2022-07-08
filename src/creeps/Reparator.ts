import * as Behavior from '../Behaviors/Creeps';

/** 
 * Creep that is going to fill up then repair stuff.
 * Eventually it also transfers resources from storage to spawn when idle. 
 */
export class Reparator {
    /** Repair / Gather / Store */
    static run(creep: Creep) {
        creep.memory.repairing = Behavior.Repair.run(creep) || 
            !(Behavior.Gather.run(creep) || Behavior.Store.run(creep));
    }
}

declare global {
    interface CreepMemory {
        repairing: boolean;
    }
}