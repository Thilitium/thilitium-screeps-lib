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