"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spawn = void 0;
class Spawn {
    static run(room, options) {
        if (Memory.noMoreSpawns)
            return false;
        const resourceCost = options.bodyParts.sum();
        const resourceCapacity = room.energyCapacityAvailable;
        const availableResources = room.energyAvailable;
        if (resourceCost > resourceCapacity) {
            console.error(`🚱 Not enough energy capacity in the room to spawn the demanded creep (${resourceCost}/${resourceCapacity}).`);
            return false;
        }
        if (resourceCost > availableResources) {
            console.error(`🚱 Not enough energy available in the room to spawn the demanded creep () (${resourceCost}/${availableResources}).`);
            return false;
        }
        const newName = `${options.role}${Game.time}`;
        const memory = {
            role: options.role,
            building: false,
            buildingStructureId: undefined,
            depositingStructureId: undefined,
            harvestingSourceId: undefined,
            repairingStructureId: undefined,
            gatheringStructureId: undefined,
            mining: false,
            repairing: false,
            transporting: false,
            upgrading: false,
            storingStructureId: undefined,
            stationary: options.memoryAttributes['stationary']
        };
        const result = room.find(FIND_STRUCTURES)[0].spawnCreep(options.bodyParts, newName, {
            memory: memory
        });
        if (result === 0 || result === ERR_BUSY) {
            console.info(`✨ Spawning new ${options.role} for ${resourceCost}, ${availableResources - resourceCost}/${resourceCapacity} remaining.`);
            Memory.noMoreSpawns = true;
            return true;
        }
        console.error(`🗙 Couldnt spawn creep : ${result}`);
        return false;
    }
}
exports.Spawn = Spawn;
//# sourceMappingURL=Spawn.js.map