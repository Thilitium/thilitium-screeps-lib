/// <reference types="screeps" />
export {};
declare global {
    interface Memory {
        /** Tombstone ID's with resources that are being taken care of withrawing by creeps. */
        tombstonesTakenCareOfIds: Id<Tombstone>[];
        /** Tombstones that are currently visible to the player, and still contain resources in it. Refreshes every game tick. */
        tombstonesIds: Id<Tombstone>[];
        /** Indicates if the game loop has the right to spawn more creeps. */
        noMoreSpawns: boolean;
    }
}
