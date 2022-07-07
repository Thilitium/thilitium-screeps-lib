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
    static run(creep) {
        if (creep.store.getFreeCapacity() <= 0) {
            delete creep.memory.harvestingSourceId;
            return false;
        }
        let harvestingSource = creep.memory.harvestingSourceId ?
            Game.getObjectById(creep.memory.harvestingSourceId) : null;
        if (!harvestingSource && creep.store.getFreeCapacity() > 0)
            harvestingSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
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
}
exports.Harvest = Harvest;
//# sourceMappingURL=Harvest.js.map