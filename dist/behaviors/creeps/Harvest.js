"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Harvest = void 0;
/**
 * Behavior used to get the creep to harvest energy resources from deposits until full.
 */
class Harvest {
    /**
     * The creep will harvest energy from active sources.
     * @returns true if the creep is moving there or harvesting, false otherwise.
     */
    static run(creep, stationary) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            delete creep.memory.harvestingSourceId;
            return false;
        }
        let harvestingSource = creep.memory.harvestingSourceId ?
            Game.getObjectById(creep.memory.harvestingSourceId) : null;
        if (!harvestingSource) {
            harvestingSource = this.getFreeSourceInRoom(creep, false);
        }
        if (harvestingSource) {
            creep.memory.harvestingSourceId = harvestingSource.id;
            const result = creep.harvest(harvestingSource);
            if (!stationary && result === ERR_NOT_ENOUGH_RESOURCES) {
                delete creep.memory.harvestingSourceId;
                return false;
            }
            switch (result) {
                case ERR_NOT_IN_RANGE:
                case ERR_NOT_ENOUGH_RESOURCES:
                    creep.moveTo(harvestingSource, { visualizePathStyle: { stroke: '#ffffff' } });
                case ERR_BUSY:
                // Like when the creep is being spawned.
                case 0:
                    return true;
                default:
                    console.error('couldnt harvest source ' + result);
            }
        }
        delete creep.memory.harvestingSourceId;
        return false;
    }
    static getFreeSourceInRoom(creep, active) {
        const room = creep.room;
        const sources = room.find(active ? FIND_SOURCES_ACTIVE : FIND_SOURCES);
        const freeSources = sources.filter(source => {
            const numberOfCreepsHarvestingSource = room.find(FIND_CREEPS).filter(creep => creep.memory.harvestingSourceId === source.id).length;
            const spots = source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
            const freeSpots = spots.filter(spot => spot.terrain !== "wall").length;
            return freeSpots > numberOfCreepsHarvestingSource;
        });
        if (!freeSources.length)
            return null;
        const thatSource = creep.pos.findClosestByRange(freeSources);
        return thatSource;
    }
}
exports.Harvest = Harvest;
//# sourceMappingURL=Harvest.js.map