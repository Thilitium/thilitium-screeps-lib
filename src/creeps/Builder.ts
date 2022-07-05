import {Build, Gather, Harvest, Store} from '../Behaviors/Behaviors';
/** Creep that is going to build by any means. */
export class Builder {
    /** build, gather, harvest, store */
    run(creep: Creep) {
        if (creep.memory.building) creep.memory.building = Build.run(creep);
        if (!creep.memory.building) creep.memory.building = Build.run(creep) || !(Gather.run(creep) || Harvest.run(creep) || Store.run(creep));
    }
};

declare global {
    interface CreepMemory {
        building: boolean;
    }
}