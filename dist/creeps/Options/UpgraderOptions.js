"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgraderOptions = void 0;
class UpgraderOptions {
    /**
     * Options used to customize a upgrader creep.
     * @param maxCost The max cost to allocate to this creep.
     */
    constructor(maxCost) {
        this.bodyParts = this.getBodyParts(maxCost);
        this.role = 'builder';
        if (!this.bodyParts.length)
            throw new Error(`Cannot compute body parts for for upgrader, only giving ${maxCost} which is inferior to the minimum`);
    }
    /**
     * Get the most bosy parts possible for a upgrader creep, optimized as WORK CARRY MOVE.
     * @param cost Max cost in energy to allocate to this spawning creep.
     * @returns The body parts that the cost allows.
     */
    getBodyParts(cost) {
        const parts = [WORK, CARRY, MOVE];
        const initialCost = parts.map(part => BODYPART_COST[part]).reduce((acc, num) => acc += num, 0);
        if (initialCost > cost) {
            console.error(`Cannot compute body parts for ${cost} for upgrader, only giving ${cost}`);
            return [];
        }
        let remainingCost = cost - initialCost;
        let iPart = 0;
        do {
            let part = null;
            switch (iPart) {
                case 0:
                    part = WORK;
                    iPart = 1;
                    break;
                case 1:
                    part = CARRY;
                    iPart = 2;
                    break;
                case 2:
                    part = MOVE;
                    iPart = 0;
                    break;
                default:
                    throw new Error('Do not know what part to add to the creep');
            }
            const partCost = BODYPART_COST[part];
            if (partCost > remainingCost) {
                remainingCost = 0;
            }
            else {
                remainingCost -= partCost;
                parts.push(part);
            }
        } while (remainingCost > 0);
        return parts;
    }
}
exports.UpgraderOptions = UpgraderOptions;
//# sourceMappingURL=UpgraderOptions.js.map