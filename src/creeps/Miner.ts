import { Deposit, Harvest } from "../Behaviors/behaviors";

/**
 * Creep that is going to mine and deposit into any available storage structure.
 */
export class Miner {
    run(creep: Creep) {
        if (creep.memory.mining) creep.memory.mining = Harvest.run(creep);
        if (!creep.memory.mining) creep.memory.mining = !Deposit.run(creep);
    }
}

declare global {
    interface CreepMemory {
        mining: boolean;
    }
}