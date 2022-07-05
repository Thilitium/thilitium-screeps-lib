/**
 * Behavior used to get the creep to gather resources until full from static sources (storages, tombs, etc).
 */
export class Gather {
    /**
     * Creep will try to gather resources from Tombs, Storages and Containers.
     * @returns If the action has succeeded or not.
     */
    static run(creep: Creep): boolean {
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            if (creep.memory.gatheringStructureId && Memory.tombstonesTakenCareOfIds.includes(creep.memory.gatheringStructureId as Id<Tombstone>)) {
                Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== creep.memory.gatheringStructureId);
                delete creep.memory.gatheringStructureId;
            }
            return false;
        }
        let resourceDeposit: Tombstone | StructureContainer | StructureStorage | null = null;
        let tombId: Id<Tombstone> | null = null;
        
        // Get previous target if still holding enough material
        if (creep.memory.gatheringStructureId) {
            resourceDeposit = Game.getObjectById<Tombstone | StructureContainer | StructureStorage>(creep.memory.gatheringStructureId);
            if (resourceDeposit && resourceDeposit.store[RESOURCE_ENERGY] === 0){
                resourceDeposit = null;
            }
        }

        if(!resourceDeposit) {
            const tombsLeft = Memory.tombstonesIds.filter(el => !Memory.tombstonesTakenCareOfIds.includes(el));

            if (tombsLeft[0]) {
                tombId = tombsLeft[0];

                resourceDeposit = Game.getObjectById(tombId);
                Memory.tombstonesTakenCareOfIds.push(tombId);
                creep.memory.gatheringStructureId = tombId;
                creep.say('🪦 Collect');
            } else {
                resourceDeposit = creep.pos.findClosestByPath<StructureStorage | StructureContainer>(
                    FIND_STRUCTURES, {
                    filter: structure => 
                        (structure.structureType === STRUCTURE_STORAGE
                        || structure.structureType === STRUCTURE_CONTAINER)
                        && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity()
                });
            }
        }

        if (!resourceDeposit) {
            const resourceDeposit = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(!resourceDeposit) {
                delete creep.memory.gatheringStructureId;
                return false;
            }

            const result = creep.harvest(resourceDeposit);

            if (result == ERR_NOT_IN_RANGE) 
                creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
            else if (result === ERR_BUSY) {
                creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                return true;
            } else if (result !== 0) 
                console.log/*.error*/('creep cannot gather resources : ' + result);
            else
                return true;
        } else {
            creep.memory.gatheringStructureId = resourceDeposit.id;
            const result = creep.withdraw(resourceDeposit, RESOURCE_ENERGY);
            if (!tombId && Memory.tombstonesIds.includes(resourceDeposit.id as Id<Tombstone>)) // in case the id was already stored
                tombId = resourceDeposit.id as Id<Tombstone>;

            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                return true;
            } else if (result === ERR_BUSY) {
                creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                return true;
            } else if(result !== 0) {
                console.log/*.error*/('creep cannot withdraw from source : ' + result);
                return false;
            }
            
            if(tombId) {
                //TODO: does not work.
                if (resourceDeposit.store[RESOURCE_ENERGY] === 0)
                    console.log/*info*/('♻️ A dead\'s creep tombstone has been plundered.')
                delete creep.memory.gatheringStructureId;
                Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== tombId && t !== null);
            }
            return true;
        }

        throw new Error('Should not be here.');
    }

    /*reset(creep) {
        if (creep.memory.gatheringStructureId && Memory.tombstonesTakenCareOfIds.includes(gatheringStructureId))
            Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== structureObject.id);
        
        delete creep.memory.gatheringStructureId;
    }*/
}