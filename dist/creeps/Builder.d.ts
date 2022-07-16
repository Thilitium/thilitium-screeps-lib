/// <reference types="screeps" />
/** Creep that is going to build by any means. */
export declare class Builder {
    /** build, gather, store */
    static run(creep: Creep): void;
}
declare global {
    interface CreepMemory {
        building: boolean;
    }
}
