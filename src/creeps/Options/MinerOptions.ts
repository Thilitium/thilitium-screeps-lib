/** Options that are needed to spawn a new miner creep. */
export class MinerOptions implements CreepOptions {
    bodyParts: BodyPartConstant[];
    role: string;
    memoryAttributes: { [key: string]: any; };

    /** The basic bodyparts required for a miner to move, extract and work. */
    private readonly initialParts: BodyPartConstant[] = [CARRY, MOVE, WORK];

    /** Gets the initial cost for the basic bodyparts of a miner. */
    private get initialCost(): number { return this.initialParts.map(part => BODYPART_COST[part]).sum() }

    /**
     * Creates options specifying the miner behavior before spawn.
     * @param maxCost The cost we want to allocate to the miner spawning.
     * @param stationary If the creep should move to a source and stay there forever.
     */
    constructor(maxCost: number, stationary: boolean) {
        this.bodyParts = this.getBodyParts(maxCost);
        this.role = 'miner';
        if (!this.bodyParts.length)
            throw new Error(`Cannot compute body parts for for miner, only giving ${maxCost} which is inferior to the minimum`);

        this.memoryAttributes = {
            stationary: stationary
        };
    }

    /**
     * Get body parts for a miner creep depending on the cost allocated.
     * @param cost The maximum cost to allow to body parts for this miner creep.
     * @returns The body parts calulated depending on the cost.
     */
    private getBodyParts(cost: number): BodyPartConstant[] {
        if (this.initialCost > cost) {
            return [];
        }

        const remainingCost = cost - this.initialCost;
        const nbWorkPartsCanAdd = Math.floor(remainingCost / BODYPART_COST[WORK]);

        const newParts = [...this.initialParts];
        for (let i = 0; i < nbWorkPartsCanAdd; i++) newParts.push(WORK);

        return newParts;
    }
}