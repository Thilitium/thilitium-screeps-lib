/// <reference types="screeps" />
/**
 * Creep that is going to fill up then repair stuff.
 * Eventually it also transfers resources from storage to spawn when idle.
 */
export declare class Reparator {
    /** Repair / Gather / Store */
    static run(creep: Creep): void;
}
declare global {
    interface CreepMemory {
        repairing: boolean;
    }
}
