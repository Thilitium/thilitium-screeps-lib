"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    static run(creep) {
        if (creep.store[RESOURCE_ENERGY] === 0)
            return false;
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
exports.Store = Store;
//# sourceMappingURL=Store.js.map