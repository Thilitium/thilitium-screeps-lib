/// <reference types="screeps" />
/** Options that are needed to spawn a new miner creep. */
export declare class MinerOptions implements CreepOptions {
    bodyParts: BodyPartConstant[];
    role: string;
    memoryAttributes: {
        [key: string]: any;
    };
    /** The basic bodyparts required for a miner to move, extract and work. */
    private readonly initialParts;
    /** Gets the initial cost for the basic bodyparts of a miner. */
    private get initialCost();
    /**
     * Creates options specifying the miner behavior before spawn.
     * @param maxCost The cost we want to allocate to the miner spawning.
     * @param stationary If the creep should move to a source and stay there forever.
     */
    constructor(maxCost: number, stationary: boolean);
    /**
     * Get body parts for a miner creep depending on the cost allocated.
     * @param cost The maximum cost to allow to body parts for this miner creep.
     * @returns The body parts calulated depending on the cost.
     */
    private getBodyParts;
}
