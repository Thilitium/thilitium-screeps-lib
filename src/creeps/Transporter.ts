import {Store, Gather} from '../Behaviors/Behaviors';

/** Creep that will gather from static sources (storage and stuff, not harvesting) and deposit into upgrade storage (spawners & extensions). */
export class Transporter {
    /** Store / Gather */
    run(creep: Creep) {
        if (creep.memory.transporting) creep.memory.transporting = Store.run(creep);
        if (!creep.memory.transporting) creep.memory.transporting = Gather.run(creep);
    }
}

declare global {
    interface CreepMemory {
        transporting: boolean;
    }
}