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
exports.Spawn = void 0;
const _ = __importStar(require("lodash"));
class Spawn {
    static checkNumberOfCreepsAndSpawn(spawner, role, limitOfWorker, level) {
        if (Memory.noMoreSpawns)
            return;
        level = level || 1;
        // 200
        let roles = [WORK, CARRY, MOVE];
        // 300
        if (level === 2)
            roles = [WORK, WORK, CARRY, MOVE];
        // 350
        if (level === 3)
            roles = [WORK, WORK, CARRY, CARRY, MOVE];
        // 400
        if (level === 4)
            roles = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];
        // 500
        if (level === 5)
            roles = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
        // 700
        if (level === 6)
            roles = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];
        const resourceCost = this.bodyPartsCost(roles);
        const resourceCapacity = spawner.room.energyCapacityAvailable;
        const availableResources = spawner.room.energyAvailable;
        if (resourceCost > resourceCapacity) {
            console.error(`🚫 Not enough energy capacity in the room to spawn the demanded creep (lvl.${level} ${role}) : ${resourceCost}/${availableResources}`);
            return;
        }
        const creepsOfRole = _.filter(Game.creeps, creep => creep.memory.role === role);
        // Spawn creeps if needed.
        if (creepsOfRole.length < limitOfWorker && availableResources >= resourceCost) {
            const newName = `${role}${Game.time}`;
            const result = spawner.spawnCreep(roles, newName, {
                memory: {
                    role: role,
                    building: false,
                    buildingStructureId: undefined,
                    depositingStructureId: undefined,
                    harvestingSourceId: undefined,
                    repairingStructureId: undefined,
                    gatheringStructureId: undefined,
                    mining: false,
                    repairing: false,
                    transporting: false,
                    upgrading: false
                }
            });
            if (result !== 0 && result !== ERR_BUSY)
                console.error(`Couldnt spawn creep : ${result}`);
            else
                console.info(`✨ Spawning new ${role} of level ${level} (${creepsOfRole.length + 1}/${limitOfWorker} ${role}). Cost ${resourceCost}, ${availableResources - resourceCost}/${resourceCapacity} remaining.`);
            Memory.noMoreSpawns = true;
        }
        // supprime les creeps en trop
        if (creepsOfRole.length > limitOfWorker) {
            creepsOfRole.slice(limitOfWorker).forEach((creep) => creep.suicide());
            console.info(`✂️ Supprime Creeps du role ${role} en trop (${creepsOfRole.length}/${limitOfWorker}).`);
        }
    }
    /**
     * Calcultates the cost of the body parts of a creep.
     * @param {int[]} parts The array of constants representing the body parts for which to get the price for.
     * @returns {int} The price of the combined body parts.
     */
    static bodyPartsCost(parts) {
        let sum = 0;
        for (let i in parts)
            sum += BODYPART_COST[parts[i]];
        return sum;
    }
}
exports.Spawn = Spawn;
//# sourceMappingURL=Spawn.js.map