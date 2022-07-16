"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
/**
 * Behavior that will try to get resources from storages and containers in the room to the spawner and extensions.
 * TODO: It tries to equilibrate all storages if spawner full.
 */
class Store {
    static run(creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            delete creep.memory.storingStructureId;
            return false;
        }
        let target = creep.memory.storingStructureId ?
            Game.structures[creep.memory.storingStructureId]
            : null;
        // Check first infrastructure targets
        target = (target && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ? target : creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION
                    || structure.structureType === STRUCTURE_SPAWN
                    || structure.structureType === STRUCTURE_TOWER)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        // Then check the most empty storage unit.
        /*if (!target) {
            const emptyStorages = creep.room.find<StructureContainer | StructureStorage>(FIND_STRUCTURES ,{filter : structure =>
                (structure.structureType === STRUCTURE_STORAGE || structure.structureType === STRUCTURE_CONTAINER)
                    && structure.store[RESOURCE_ENERGY] < structure.store.getCapacity(RESOURCE_ENERGY) * 0.5});
            if (emptyStorages.length) {
                target = emptyStorages.sort((a, b) => a.store[RESOURCE_ENERGY] > b.store[RESOURCE_ENERGY] ? 1 : -1)[0];
            }
        }*/
        if (target) {
            creep.memory.storingStructureId = target.id;
            const result = creep.transfer(target, RESOURCE_ENERGY);
            switch (result) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                case ERR_BUSY:
                case 0:
                    return true;
                default:
                    console.error(`could not store to source : ${result}`);
            }
        }
        delete creep.memory.storingStructureId;
        return false;
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map