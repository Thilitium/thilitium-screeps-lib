/// <reference types="screeps" />
/** Controls the behavior for a whole room. */
export declare class RoomController {
    static run(room: Room): void;
    /**
     * Spawn the appropriate amount of miners in the room at the max possible level.
     * Detects if those should be stationary of transfer resources to all structures (i.e. if transporters exists in the room).
     * @param room The room in which to spawn the miners.
     * @returns If a miner was spawn.
     */
    private static spawnMiners;
    /**
     * Tries to spawn 1 transporter for 2 storages units.
     * @param room The room in which to spawn the creep.
     * @returns If a creep was spawned.
     */
    private static spawnTransporters;
    /**
     * Tries to spawn one creep per construction site currently in the room, capped at 4.
     * @param room The room in which to spawn the creep.
     * @returns If a creep has been spawned.
     */
    private static spawnBuilders;
    /**
     * Tries to spawn a reparator for each 20 structures in the room.
     * @param room The room in which to try to spawn the creep.
     * @returns If a creep has been spawned.
     */
    private static spawnReparators;
    /**
     * Tries to spawn half as much upgraders as there are other types of creeps in the room.
     * @param room The room in which to try to spawn the creep.
     * @returns If a creep has been spawned.
     */
    private static spawnUpgraders;
    /**
     * Get the creeps in the room that matches the specified role.
     * @param room The room in which to search for.
     * @param role The role to search for in the room.
     * @returns The array of creeps of demanded role in the room.
     */
    private static creepsInRoom;
}
