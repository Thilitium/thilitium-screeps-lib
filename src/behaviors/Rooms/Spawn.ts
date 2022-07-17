export class Spawn {
    static run(room: Room, options: CreepOptions): boolean {
        if (Memory.noMoreSpawns) return false;

        const resourceCost = options.bodyParts.reduce((a, b) => a += BODYPART_COST[b], 0);
        const resourceCapacity = room.energyCapacityAvailable;
        const availableResources = room.energyAvailable;

        if (resourceCost > resourceCapacity) {
            console.error(`🚱 Not enough energy capacity in the room to spawn the demanded creep (${resourceCost}/${resourceCapacity}).`);
            return false;
        }

        if (resourceCost > availableResources) {
            return false;
        }

        const newName = `${options.role}${Game.time}`;
        const memory: CreepMemory = {
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
            stationary: options.memoryAttributes?.length ? options.memoryAttributes['stationary'] : null
        };

        const result = room.find(FIND_MY_SPAWNS)[0].spawnCreep(
            options.bodyParts,
            newName,
            {
                memory: memory
            }
        );

        if (result === 0 || result === ERR_BUSY) {
            console.info(`✨ Spawning new ${options.role} for ${resourceCost}, ${availableResources - resourceCost}/${resourceCapacity} remaining.`);
            Memory.noMoreSpawns = true;
            return true;
        }

        console.error(`🗙 Couldnt spawn creep : ${result}`);
        return false;
    }
}
