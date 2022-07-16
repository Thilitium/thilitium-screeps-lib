/** Behavior that can be used by creeps to build stuff. */
export class Build {
    /** 
     * Creeps will try to find a construction site to build and return true while they are currently building.
     * @returns True if building or moving there, 
     * False if the creep has no more energy available or the building has disappeared / is finished.
     */
    static run(creep: Creep) {
        if (creep.store[RESOURCE_ENERGY] === 0) {
            delete creep.memory.buildingStructureId;
            return false;
        }

        // Ensures that structure potentially in memory still exists in game
        let buildingStructure: ConstructionSite | null = Game.constructionSites[creep.memory.buildingStructureId || -1] || null;

        // Find a new structure to build to if none.
        if (!buildingStructure && creep.store.getFreeCapacity() === 0 && creep.room.find(FIND_CONSTRUCTION_SITES).length) {
            buildingStructure = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        }

        if (buildingStructure) {
            const result = creep.build(buildingStructure);
            creep.memory.buildingStructureId = buildingStructure.id;
            switch (result) {
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(buildingStructure, { visualizePathStyle: { stroke: '#ffffff' } });
                case 0:
                    return true;
                default:
                    // could not repair
            }
        }

        delete creep.memory.buildingStructureId;
        return false;
    }
}