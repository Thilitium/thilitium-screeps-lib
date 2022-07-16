/** Behavior that can be used by creeps to build stuff. */
export class Deposit {
    /** 
     * Creeps will try to find a construction site to build and return true while they are currently building.
     * If the creep has no more energy available or the building has disappeared / is finished, returns false.
     */
    static run(creep: Creep, onlyInRange: boolean = false) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            delete creep.memory.depositingStructureId;
            return false;
        }

        let depositStructure: StructureContainer | StructureStorage | StructureExtension | StructureSpawn | StructureTower | null = null;

        // Try to get the stored deposit structure if exists
        if (creep.memory.depositingStructureId)
            depositStructure = Game.getObjectById<StructureContainer | StructureStorage | StructureExtension | StructureSpawn | StructureTower>
                (creep.memory.depositingStructureId);

        if (!depositStructure || depositStructure.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            let structureFilter = (structure: StructureContainer | StructureStorage | StructureExtension | StructureSpawn | StructureTower) =>
                (structure.structureType == STRUCTURE_CONTAINER
                    || structure.structureType == STRUCTURE_STORAGE
                    || structure.structureType == STRUCTURE_EXTENSION
                    || structure.structureType == STRUCTURE_SPAWN
                    || structure.structureType == STRUCTURE_TOWER)
                    && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;

            if (onlyInRange) {
                depositStructure = creep.pos.findInRange<StructureContainer | StructureStorage | StructureExtension | StructureSpawn | StructureTower> 
                    (FIND_STRUCTURES, 1, { filter: structureFilter })[0] || null;
            } else {
                depositStructure = creep.pos.findClosestByPath(
                    FIND_STRUCTURES, { filter: structureFilter }
                );
            }
        }

        if (depositStructure) {
            creep.memory.depositingStructureId = depositStructure.id;
            const result = creep.transfer(depositStructure, RESOURCE_ENERGY);

            switch (result) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(depositStructure, { visualizePathStyle: { stroke: '#ffffff' } });
                    return true;
                case 0:
                    delete creep.memory.depositingStructureId;
                    return true;
                default:
                    delete creep.memory.depositingStructureId;
                    return false;
            }
        } else {
            delete creep.memory.depositingStructureId;
            return false;
        }
    }
}