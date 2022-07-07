/// <reference types="screeps" />
/**
 * Creep meant to upgrade the main controller of its own room by any means.
 * When controller is fully upgraded, it becomes a transporter.
 */
export declare class Upgrader {
    /** Upgrade / Gather / Harvest / Store */
    static run(creep: Creep): void;
}
declare global {
    interface CreepMemory {
        upgrading: boolean;
    }
}
