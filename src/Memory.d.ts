export {};

declare global {
    interface Memory {
        /** Tombstone ID's with resources that are being taken care of withrawing by creeps. */
        tombstonesTakenCareOfIds: Id<Tombstone>[];
        /** Tombstones that are currently visible to the player, and still contain resources in it. Refreshes every game tick. */
        tombstonesIds: Id<Tombstone>[];
    }    
}