export {};

declare global {
    interface CreepMemory {
        /** Structure from which the creep is currently gathering resources. */
         gatheringStructureId?: Id<Tombstone | StructureContainer | StructureStorage>;
    }
}