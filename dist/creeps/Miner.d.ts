/// <reference types="screeps" />
/**
 * Creep that is going to mine and deposit into any available storage structure.
 */
export declare class Miner {
    static run(creep: Creep): void;
}
declare global {
    interface CreepMemory {
        mining: boolean;
    }
}
