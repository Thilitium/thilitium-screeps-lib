/// <reference types="screeps" />
/** Behavior that can be used by creeps to build stuff. */
export declare class Build {
    /**
     * Creeps will try to find a construction site to build and return true while they are currently building.
     * @returns True if building or moving there,
     * False if the creep has no more energy available or the building has disappeared / is finished.
     */
    static run(creep: Creep): boolean;
}
