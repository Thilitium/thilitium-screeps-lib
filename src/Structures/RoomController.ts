import * as Behavior from './../Behaviors';
import * as Creeps from '../Creeps';

/** Controls the behavior for a whole room. */
export class RoomController {
    static run(room: Room) {
        this.spawnMiners(room) ||
            this.spawnTransporters(room) ||
            this.spawnReparators(room) ||
            this.spawnBuilders(room) ||
            this.spawnUpgraders(room);
    }

    /**
     * Spawn the appropriate amount of miners in the room at the max possible level.
     * Detects if those should be stationary of transfer resources to all structures (i.e. if transporters exists in the room).
     * @param room The room in which to spawn the miners.
     * @returns If a miner was spawn.
     */
    private static spawnMiners(room: Room): boolean {
        if (Memory.noMoreSpawns) return false;

        const miningSpotsInRoom = room.find(FIND_SOURCES).filter(source =>
            source.room.lookForAtArea(
                LOOK_TERRAIN,
                source.pos.y - 1, source.pos.x - 1,
                source.pos.y + 1, source.pos.x + 1, true).length
        ).length;

        if (!miningSpotsInRoom) {
            console.error(`There is no energy mining spots in room ${room.name}.`);
            return false;
        }

        if (this.creepsInRoom(room, 'miner').length >= miningSpotsInRoom) {
            return false;
        }

        const stationaryMiner = !!this.creepsInRoom(room, 'transporter').length;
        return Behavior.Rooms
        .Spawn.run(room, new Creeps.MinerOptions(room.energyAvailable, stationaryMiner));
    }

    /**
     * Tries to spawn 1 transporter for 2 storages units.
     * @param room The room in which to spawn the creep.
     * @returns If a creep was spawned.
     */
    private static spawnTransporters(room: Room): boolean {
        if (Memory.noMoreSpawns) return false;

        const storageStructures = room.find<StructureStorage | StructureContainer>(FIND_STRUCTURES);
        if (!storageStructures.length)
            return false;

        const transportersNeeded = Math.ceil(storageStructures.length / 2);
        if (this.creepsInRoom(room, 'transporter').length >= transportersNeeded)
            return false;

        return Behavior.Rooms.Spawn.run(room, new Creeps.TransporterOptions(room.energyAvailable));
    }

    /**
     * Tries to spawn one creep per construction site currently in the room, capped at 4.
     * @param room The room in which to spawn the creep.
     * @returns If a creep has been spawned.
     */
    private static spawnBuilders(room: Room): boolean {
        if (Memory.noMoreSpawns) return false;

        const buildersInRoom = this.creepsInRoom(room, 'builder').length;
        if (buildersInRoom >= 4) return false;

        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);

        if (constructionSites.length > buildersInRoom)
            return Behavior.Rooms.Spawn.run(room, new Creeps.BuilderOptions(room.energyAvailable));

        return false;
    }

    /**
     * Tries to spawn a reparator for each 20 structures in the room.
     * @param room The room in which to try to spawn the creep.
     * @returns If a creep has been spawned.
     */
    private static spawnReparators(room: Room): boolean {
        if (Memory.noMoreSpawns) return false;

        const structuresInRoom = room.find(FIND_STRUCTURES).length;
        if (!structuresInRoom) return false;

        if (this.creepsInRoom(room, 'reparator').length >= Math.ceil(structuresInRoom / 20))
            return false;

        return Behavior.Rooms.Spawn.run(room, new Creeps.ReparatorOptions(room.energyAvailable));
    }

    /**
     * Tries to spawn half as much upgraders as there are other types of creeps in the room.
     * @param room The room in which to try to spawn the creep.
     * @returns If a creep has been spawned.
     */
    private static spawnUpgraders(room: Room): boolean {
        if (Memory.noMoreSpawns) return false;

        const nbCreepsOtherThanUpgrader = room.find(FIND_CREEPS, { filter: creep => creep.memory.role !== 'upgrader' }).length;
        if (!nbCreepsOtherThanUpgrader)
            return false;

        const nbUpgradersNeeded = Math.ceil(nbCreepsOtherThanUpgrader / 2);
        if (this.creepsInRoom(room, 'upgrader').length >= nbUpgradersNeeded)
            return false;

        return Behavior.Rooms.Spawn.run(room, new Creeps.UpgraderOptions(room.energyAvailable));
    }

    /**
     * Get the creeps in the room that matches the specified role.
     * @param room The room in which to search for.
     * @param role The role to search for in the room.
     * @returns The array of creeps of demanded role in the room.
     */
    private static creepsInRoom(room: Room, role: string): Creep[] {
        return room.find(FIND_CREEPS, { filter: creep => creep.memory.role === role });
    }
}