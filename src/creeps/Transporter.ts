import * as Behavior from '../Behaviors/Creeps';

/** Creep that will gather from static sources (storage and stuff, not harvesting) and deposit into upgrade storage (spawners & extensions). */
export class Transporter {
    /** Store / Gather */
    static run(creep: Creep) {
        creep.memory.transporting = Behavior.Store.run(creep) ||
            !(Behavior.Gather.run(creep) || Behavior.Repair.run(creep) || Behavior.Build.run(creep));
    }
}

declare global {
    interface CreepMemory {
        transporting: boolean;
    }
}