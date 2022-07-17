"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const Behavior = __importStar(require("./../Behaviors"));
const Creeps = __importStar(require("../Creeps"));
/** Controls the behavior for a whole room. */
class RoomController {
    static run(room) {
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
    static spawnMiners(room) {
        if (Memory.noMoreSpawns)
            return false;
        const miningSpotsInRoom = room.find(FIND_SOURCES).map(source => source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true).filter(terrain => terrain.terrain !== 'wall').length).reduce((a, b) => a += b, 0);
        if (!miningSpotsInRoom) {
            console.error(`There is no energy mining spots in room ${room.name}.`);
            return false;
        }
        if (this.creepsInRoom(room, 'miner').length >= miningSpotsInRoom) {
            return false;
        }
        const stationaryMiner = !!this.creepsInRoom(room, 'transporter').length;
        Behavior.Rooms.Spawn.run(room, new Creeps.MinerOptions(room.energyCapacityAvailable, stationaryMiner));
        return true;
    }
    /**
     * Tries to spawn 1 transporter for 2 storages units.
     * @param room The room in which to spawn the creep.
     * @returns If a creep was spawned.
     */
    static spawnTransporters(room) {
        if (Memory.noMoreSpawns)
            return false;
        const storageStructures = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_STORAGE || structure.structureType === STRUCTURE_CONTAINER });
        if (!storageStructures.length)
            return false;
        const transportersNeeded = Math.ceil(storageStructures.length / 2);
        if (this.creepsInRoom(room, 'transporter').length >= transportersNeeded)
            return false;
        Behavior.Rooms.Spawn.run(room, new Creeps.TransporterOptions(room.energyCapacityAvailable));
        return true;
    }
    /**
     * Tries to spawn one creep per construction site currently in the room, capped at 4.
     * @param room The room in which to spawn the creep.
     * @returns If a creep has been spawned.
     */
    static spawnBuilders(room) {
        if (Memory.noMoreSpawns)
            return false;
        const buildersInRoom = this.creepsInRoom(room, 'builder').length;
        if (buildersInRoom >= 4)
            return false;
        const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
        console.log(buildersInRoom + ' ' + constructionSites.length);
        if (constructionSites.length <= buildersInRoom) {
            return false;
        }
        Behavior.Rooms.Spawn.run(room, new Creeps.BuilderOptions(room.energyCapacityAvailable));
        return true;
    }
    /**
     * Tries to spawn a reparator for each 20 structures in the room.
     * @param room The room in which to try to spawn the creep.
     * @returns If a creep has been spawned.
     */
    static spawnReparators(room) {
        if (Memory.noMoreSpawns)
            return false;
        const structuresInRoom = room.find(FIND_STRUCTURES).length;
        if (structuresInRoom < 4)
            return false;
        if (this.creepsInRoom(room, 'reparator').length >= Math.ceil(structuresInRoom / 20))
            return false;
        Behavior.Rooms.Spawn.run(room, new Creeps.ReparatorOptions(room.energyCapacityAvailable));
        return true;
    }
    /**
     * Tries to spawn half as much upgraders as there are other types of creeps in the room.
     * @param room The room in which to try to spawn the creep.
     * @returns If a creep has been spawned.
     */
    static spawnUpgraders(room) {
        if (Memory.noMoreSpawns)
            return false;
        const nbCreepsOtherThanUpgrader = room.find(FIND_CREEPS, { filter: creep => creep.memory.role !== 'upgrader' }).length;
        if (!nbCreepsOtherThanUpgrader)
            return false;
        const nbUpgradersNeeded = Math.ceil(nbCreepsOtherThanUpgrader / 2);
        if (this.creepsInRoom(room, 'upgrader').length >= nbUpgradersNeeded)
            return false;
        Behavior.Rooms.Spawn.run(room, new Creeps.UpgraderOptions(room.energyCapacityAvailable));
        return true;
    }
    /**
     * Get the creeps in the room that matches the specified role.
     * @param room The room in which to search for.
     * @param role The role to search for in the room.
     * @returns The array of creeps of demanded role in the room.
     */
    static creepsInRoom(room, role) {
        return room.find(FIND_CREEPS, { filter: creep => creep.memory.role === role });
    }
}
exports.RoomController = RoomController;
//# sourceMappingURL=RoomController.js.map