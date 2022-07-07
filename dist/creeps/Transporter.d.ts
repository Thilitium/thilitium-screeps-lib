/// <reference types="screeps" />
/** Creep that will gather from static sources (storage and stuff, not harvesting) and deposit into upgrade storage (spawners & extensions). */
export declare class Transporter {
    /** Store / Gather */
    static run(creep: Creep): void;
}
declare global {
    interface CreepMemory {
        transporting: boolean;
    }
}
