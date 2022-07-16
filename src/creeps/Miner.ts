import * as Behavior from "../Behaviors/Creeps";

/**
 * Creep that is going to mine and deposit into any available storage structure.
 */
export class Miner {
    static run(creep: Creep, stationary: boolean = false) {
        creep.memory.mining = Behavior.Harvest.run(creep, stationary) || !Behavior.Deposit.run(creep, stationary);
    }
}

declare global {
    interface CreepMemory {
        /** Indicates if the creep is mining or doing something else for the Creeps.Miner */
        mining: boolean;
    }
}