/// <reference types="screeps" />
/** Behavior that updates the creep's own room controller. */
export declare class Upgrade {
    /**
     * The creep tries to upgrade the controller.
     * @returns False if couldnt upgrade (low on resource or no controller or wtv).
     */
    static run(creep: Creep): boolean;
}
