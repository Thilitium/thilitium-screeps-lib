export class TransporterOptions implements CreepOptions {
    bodyParts: BodyPartConstant[];
    role: string;
    memoryAttributes: { [key: string]: any; };

    /**
     * Options used to customize a transporter creep.
     * @param maxCost The max cost to allocate to this creep.
     */
    constructor(maxCost: number) {
        this.bodyParts = this.getBodyParts(maxCost);
        this.role = 'transporter';
        if (!this.bodyParts.length)
            throw new Error(`Cannot compute body parts for for miner, only giving ${maxCost} which is inferior to the minimum`);
    }

    /**
     * Get the most bosy parts possible for a transporting creep, optimized as MOVE CARRY.
     * @param cost Max cost in energy to allocate to this spawning creep.
     * @returns The body parts that the cost allows.
     */
    private getBodyParts(cost: number): BodyPartConstant[] {
        const parts = [CARRY, MOVE];
        const initialCost = parts.map(part => BODYPART_COST[part]).reduce((acc, num) => acc += num, 0);

        if (initialCost > cost) {
            console.error(`Cannot compute body parts for ${cost} for miner, only giving ${cost}`);
            return [];
        }

        const remainingCost = cost - initialCost;
        const nbWorkPartsCanAdd = Math.floor(remainingCost / BODYPART_COST[MOVE]);

        for (let i = 0; i < nbWorkPartsCanAdd; i++)
            parts.push(i % 3 === 0 ? MOVE : CARRY);

        return parts;
    }
}