/**
 * Behavior used to get the creep to repair stuff in the room.
 */
export class Repair {
    static run(creep: Creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            delete creep.memory.repairingStructureId;
            return false;
        }

        let damagedStructure: Structure | null = creep.memory.repairingStructureId ?
            Game.getObjectById<Structure>(creep.memory.repairingStructureId) : null;
            
        if (damagedStructure && damagedStructure.hits === damagedStructure.hitsMax)
            damagedStructure = null;
        /*let maxRepairingCreeps = 1;

        if (repairingStructure && creep.store[RESOURCE_ENERGY] == 0) {
            const structure = Game.getObjectById(creep.memory.repairingStructureId);

            if (structure.memory && structure.memory.creepsRepairing) {
                structure.memory.creepsRepairing--;

                if (structure.memory.creepsRepairing === 0)
                    delete structure.memory.creepsRepairing;
            }

            delete creep.memory.repairing;
            delete creep.memory.repairingStructureId;
            return false;
        }*/



        if (!damagedStructure) {
            // roads
            damagedStructure = creep.room.find(FIND_STRUCTURES, {
                filter: structure =>
                    structure.structureType === STRUCTURE_ROAD
                    && structure.hits + .1 * structure.hitsMax < structure.hitsMax
                    /*&& (!structure.memory
                        || (structure.memory.creepsRepairing < maxRepairingCreeps))*/
            }).sort((a, b) => a.hits > b.hits ? 1 : -1)[0];

            // Others than roads or walls
            damagedStructure = damagedStructure || creep.room.find(FIND_STRUCTURES, {
                filter: structure =>
                    structure.structureType !== STRUCTURE_ROAD
                    && structure.structureType !== STRUCTURE_WALL
                    && structure.hits + .1 * structure.hitsMax < structure.hitsMax
                    /*&& (!structure.memory
                        || (structure.memory.creepsRepairing < maxRepairingCreeps))*/
            }).sort((a, b) => a.hits > b.hits ? 1 : -1)[0];

            // Walls
            damagedStructure = damagedStructure || creep.room.find(FIND_STRUCTURES, {
                filter: structure =>
                    structure.structureType === STRUCTURE_WALL
                    && structure.hits + .1 * structure.hitsMax < structure.hitsMax
                    /*&& (!structure.memory
                        || (structure.memory.creepsRepairing < maxRepairingCreeps))*/
            }).sort((a, b) => a.hits > b.hits ? 1 : -1)[0];
        }

        if (damagedStructure) {
            creep.memory.repairingStructureId = damagedStructure.id;
            switch (creep.repair(damagedStructure)) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(damagedStructure, { visualizePathStyle: { stroke: '#3347ff' } });
                case 0:
                    return true;
            }
        }
        
        delete creep.memory.repairingStructureId;
        return false;
    }
}