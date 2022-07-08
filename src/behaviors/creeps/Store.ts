export class Store {
    static run(creep: Creep): boolean {
        if (creep.store[RESOURCE_ENERGY] === 0) return false;
        //TODO: Refactor this shit
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION
                    || structure.structureType === STRUCTURE_SPAWN
                    || structure.structureType === STRUCTURE_TOWER)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        if (target) {
            switch (creep.transfer(target, RESOURCE_ENERGY)) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                case 0:
                    return true;
            }
        }

        return false;
    }
}