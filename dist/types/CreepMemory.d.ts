/// <reference types="screeps" />
export {};
declare global {
    interface CreepMemory {
        /** Structure from which the creep is currently gathering resources. */
        gatheringStructureId?: Id<Tombstone | StructureContainer | StructureStorage>;
        /** Role assigned to the creep. */
        role: string;
        /** Indicates the structure a creep may be assigned to build. */
        buildingStructureId: Id<ConstructionSite> | undefined;
        /** Indicates the storage unit a creep may be assigned to deposit resources to. */
        depositingStructureId: Id<StructureContainer | StructureStorage | StructureExtension | StructureSpawn | StructureTower> | undefined;
        harvestingSourceId: Id<Source> | undefined;
        repairingStructureId: Id<Structure> | undefined;
    }
}
