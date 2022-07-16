"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinerOptions = void 0;
/** Options that are needed to spawn a new miner creep. */
class MinerOptions {
    /**
     * Creates options specifying the miner behavior before spawn.
     * @param maxCost The cost we want to allocate to the miner spawning.
     * @param stationary If the creep should move to a source and stay there forever.
     */
    constructor(maxCost, stationary) {
        /** The basic bodyparts required for a miner to move, extract and work. */
        this.initialParts = [CARRY, MOVE, WORK];
        this.bodyParts = this.getBodyParts(maxCost);
        if (!this.bodyParts.length)
            throw new Error(`Cannot compute body parts for for miner, only giving ${maxCost} which is inferior to the minimum`);
        this.memoryAttributes = {
            stationary: stationary
        };
    }
    /** Gets the initial cost for the basic bodyparts of a miner. */
    get initialCost() { return this.initialParts.map(part => BODYPART_COST[part]).sum(); }
    /**
     * Get body parts for a miner creep depending on the cost allocated.
     * @param cost The maximum cost to allow to body parts for this miner creep.
     * @returns The body parts calulated depending on the cost.
     */
    getBodyParts(cost) {
        if (this.initialCost > cost) {
            return [];
        }
        const remainingCost = cost - this.initialCost;
        const nbWorkPartsCanAdd = Math.floor(remainingCost / BODYPART_COST[WORK]);
        const newParts = [...this.initialParts];
        for (let i = 0; i < nbWorkPartsCanAdd; i++)
            newParts.push(WORK);
        return newParts;
    }
}
exports.MinerOptions = MinerOptions;
//# sourceMappingURL=MinerOptions.js.map