"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deposit = void 0;
/** Behavior that can be used by creeps to build stuff. */
class Deposit {
    /**
     * Creeps will try to find a construction site to build and return true while they are currently building.
     * If the creep has no more energy available or the building has disappeared / is finished, returns false.
     */
    static run(creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            delete creep.memory.depositingStructureId;
            return false;
        }
        let depositStructure = null;
        // Try to get the stored deposit structure if exists
        if (creep.memory.depositingStructureId)
            depositStructure = Game.getObjectById(creep.memory.depositingStructureId);
        if (!depositStructure || depositStructure.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            depositStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER
                        || structure.structureType == STRUCTURE_STORAGE
                        || structure.structureType == STRUCTURE_EXTENSION
                        || structure.structureType == STRUCTURE_SPAWN
                        || structure.structureType == STRUCTURE_TOWER)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        }
        if (depositStructure) {
            creep.memory.depositingStructureId = depositStructure.id;
            const result = creep.transfer(depositStructure, RESOURCE_ENERGY);
            switch (result) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(depositStructure, { visualizePathStyle: { stroke: '#ffffff' } });
                case 0:
                    return true;
                default:
                    delete creep.memory.depositingStructureId;
                    return false;
            }
        }
        else {
            delete creep.memory.depositingStructureId;
            return false;
        }
    }
}
exports.Deposit = Deposit;
//# sourceMappingURL=Deposit.js.map