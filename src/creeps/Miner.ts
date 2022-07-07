import * as Behavior from "../Behaviors/Creeps";

/**
 * Creep that is going to mine and deposit into any available storage structure.
 */
export class Miner {
    static run(creep: Creep) {
        if (creep.memory.mining) creep.memory.mining = Behavior.Harvest.run(creep);
        if (!creep.memory.mining) creep.memory.mining = !Behavior.Deposit.run(creep);
    }
}

declare global {
    interface CreepMemory {
        mining: boolean;
    }
}