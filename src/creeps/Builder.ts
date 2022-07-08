import * as Behaviors from '../Behaviors/Creeps';
/** Creep that is going to build by any means. */
export class Builder {
    /** build, gather, harvest, store */
    static run(creep: Creep) {
        creep.memory.building = Behaviors.Build.run(creep) 
            || !(Behaviors.Gather.run(creep) || Behaviors.Harvest.run(creep) || Behaviors.Store.run(creep));
    }
};

declare global {
    interface CreepMemory {
        building: boolean;
    }
}