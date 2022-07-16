/// <reference types="screeps" />
/**
 * Creep that is going to mine and deposit into any available storage structure.
 */
export declare class Miner {
    static run(creep: Creep, stationary?: boolean): void;
}
declare global {
    interface CreepMemory {
        /** Indicates if the creep is mining or doing something else for the Creeps.Miner */
        mining: boolean;
    }
}
