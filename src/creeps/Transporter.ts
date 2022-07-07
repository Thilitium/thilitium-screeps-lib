import * as Behavior from '../Behaviors/Creeps';

/** Creep that will gather from static sources (storage and stuff, not harvesting) and deposit into upgrade storage (spawners & extensions). */
export class Transporter {
    /** Store / Gather */
    static run(creep: Creep) {
        if (creep.memory.transporting) creep.memory.transporting = Behavior.Store.run(creep);
        if (!creep.memory.transporting) creep.memory.transporting = Behavior.Gather.run(creep);
    }
}

declare global {
    interface CreepMemory {
        transporting: boolean;
    }
}