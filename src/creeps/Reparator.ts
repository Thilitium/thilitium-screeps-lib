import {Gather, Repair, Store} from '../Behaviors/Behaviors';

/** 
 * Creep that is going to fill up then repair stuff.
 * Eventually it also transfers resources from storage to spawn when idle. 
 */
export class Reparator {
    /** Repair / Gather / Store */
    run(creep: Creep) {
        if (creep.memory.repairing) creep.memory.repairing = Repair.run(creep);
        if (!creep.memory.repairing) creep.memory.repairing = !(Gather.run(creep) || Store.run(creep));
    }
}

declare global {
    interface CreepMemory {
        repairing: boolean;
    }
}