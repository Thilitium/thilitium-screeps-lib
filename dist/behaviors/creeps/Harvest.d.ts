/// <reference types="screeps" />
/**
 * Behavior used to get the creep to harvest energy resources from deposits until full.
 */
export declare class Harvest {
    /**
     * The creep will harvest energy from active sources.
     * @returns true if the creep is moving there or harvesting, false otherwise.
     */
    static run(creep: Creep): boolean;
}
