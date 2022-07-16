/// <reference types="screeps" />
/** Behavior that can be used by creeps to build stuff. */
export declare class Deposit {
    /**
     * Creeps will try to find a construction site to build and return true while they are currently building.
     * If the creep has no more energy available or the building has disappeared / is finished, returns false.
     */
    static run(creep: Creep, onlyInRange?: boolean): boolean;
}
