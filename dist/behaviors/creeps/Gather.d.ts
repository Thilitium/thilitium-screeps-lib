/// <reference types="screeps" />
/**
 * Behavior used to get the creep to gather resources until full from static sources (storages, tombs, etc).
 */
export declare class Gather {
    /**
     * Creep will try to gather resources from Tombs, Storages and Containers.
     * @returns If the action has succeeded or not.
     */
    static run(creep: Creep): boolean;
}
