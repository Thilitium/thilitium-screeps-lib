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
            /*if (creep.memory.gatheringStructureId && Memory.tombstonesTakenCareOfIds.includes(creep.memory.gatheringStructureId as Id<Tombstone>)) {
                Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== creep.memory.gatheringStructureId);
            }*/

            delete creep.memory.gatheringStructureId;
            return false;
        }
        let resourceDeposit: /*Tombstone | */StructureContainer | StructureStorage | null = 
            creep.memory.gatheringStructureId ?
                Game.getObjectById</*Tombstone | */StructureContainer | StructureStorage>(creep.memory.gatheringStructureId)
                : null;
        //let tombId: Id<Tombstone> | null = null;
        
        // Get previous target if still holding enough material
        if (creep.memory.gatheringStructureId) {

            resourceDeposit = Game.getObjectById</*Tombstone | */StructureContainer | StructureStorage>(
                creep.memory.gatheringStructureId
            ) || null;

            if (resourceDeposit && resourceDeposit.store[RESOURCE_ENERGY] === 0){
                resourceDeposit = null;
            }
        }

        if(!resourceDeposit) {
            /*const tombsLeft = Memory.tombstonesIds.filter(el => !Memory.tombstonesTakenCareOfIds.includes(el));

            if (tombsLeft[0]) {
                tombId = tombsLeft[0];

                resourceDeposit = Game.getObjectById(tombId);
                Memory.tombstonesTakenCareOfIds.push(tombId);
                creep.memory.gatheringStructureId = tombId;
                creep.say('🪦 Collect');
            } else {*/
            // take the most full storage of the room at that time.
                resourceDeposit = creep.room.find<StructureStorage | StructureContainer>(
                    FIND_STRUCTURES, {
                    filter: structure => 
                        (structure.structureType === STRUCTURE_STORAGE
                        || structure.structureType === STRUCTURE_CONTAINER)
                        && structure.store[RESOURCE_ENERGY] > structure.store.getCapacity(RESOURCE_ENERGY) * 0.5
                }).sort((a, b) => a.store[RESOURCE_ENERGY] > b.store[RESOURCE_ENERGY] ? -1 : 1)[0];
            //}
        }

        if (resourceDeposit) {
            //creep.memory.gatheringStructureId = resourceDeposit.id;

            const result = creep.withdraw(resourceDeposit, RESOURCE_ENERGY);

            if (result == ERR_NOT_IN_RANGE) {
                creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
            } else if (result === ERR_BUSY) {
                creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
            } else if(result !== 0) {
                console.error('creep cannot withdraw from source : ' + result);
                resourceDeposit = null;
            } else {
                /*if (!tombId && Memory.tombstonesIds.includes(resourceDeposit.id as Id<Tombstone>)) // in case the id was already stored
                    tombId = resourceDeposit.id as Id<Tombstone>;
                if(tombId) {
                    //TODO: does not work.
                    if (resourceDeposit.store[RESOURCE_ENERGY] === 0)
                        console.info('♻️ A dead\'s creep tombstone has been plundered.')
                    Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== tombId && t !== null);
                    resourceDeposit = null;
                }*/
            }
        }

        if (resourceDeposit) {
            creep.memory.gatheringStructureId = resourceDeposit.id;
            return true;
        }

        delete creep.memory.gatheringStructureId;
        return false;
    }

    /*reset(creep) {
        if (creep.memory.gatheringStructureId && Memory.tombstonesTakenCareOfIds.includes(gatheringStructureId))
            Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== structureObject.id);
        
        delete creep.memory.gatheringStructureId;
    }*/
}