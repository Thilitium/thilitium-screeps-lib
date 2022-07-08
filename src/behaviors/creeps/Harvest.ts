/**
 * Behavior used to get the creep to harvest energy resources from deposits until full.
 */
export class Harvest {
    /**
     * The creep will harvest energy from active sources.
     * @returns true if the creep is moving there or harvesting, false otherwise.
     */
    static run(creep: Creep) {
        if (creep.store.getFreeCapacity() <= 0) {
            delete creep.memory.harvestingSourceId;
            return false;
        }

        let harvestingSource: Source | null = creep.memory.harvestingSourceId ?
            Game.getObjectById<Source>(creep.memory.harvestingSourceId) : null;

        if (!harvestingSource && creep.store.getFreeCapacity() > 0) {
            harvestingSource = this.getFreeActiveSourceInRoom(creep);
        }

        if (harvestingSource) {
            const result = creep.harvest(harvestingSource);
            switch (result) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(harvestingSource, { visualizePathStyle: { stroke: '#ffffff' } });
                case 0:
                    creep.memory.harvestingSourceId = harvestingSource.id;
                    return true;
            }
        }

        delete creep.memory.harvestingSourceId;
        return false;
    }

    /*private static getFreeActiveSource(creep: Creep): Source | null {
        const room = creep.room;
        const sources = room.find(FIND_SOURCES_ACTIVE);

        const paths = sources.filter(source => {
            const result = PathFinder.search(
                creep.pos, 
                source.pos, 
                {
                    maxRooms: 1
                }
            );

            if (result.incomplete) return false;

            return true;
        });

        if (!paths.length) return null;
        
        return paths[0];
    }*/
    private static getFreeActiveSourceInRoom(creep: Creep): Source | null {
        const room = creep.room;
        const sources = room.find(FIND_SOURCES_ACTIVE);
        const freeSources  = sources.filter(source => {
            const numberOfCreepsHarvestingSource = room.find(FIND_CREEPS).filter(creep => creep.memory.harvestingSourceId === source.id).length;
            const spots = source.room.lookForAtArea(
                LOOK_TERRAIN,
                source.pos.y - 1, source.pos.x - 1, 
                source.pos.y + 1, source.pos.x + 1, true);
            const freeSpots = spots.filter(spot => spot.terrain !== "wall").length;
            
            return freeSpots > numberOfCreepsHarvestingSource;
        });

        if(!freeSources.length) return null;

        return creep.pos.findClosestByRange(freeSources);
    }
}