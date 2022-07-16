/** Behavior that updates the creep's own room controller. */
export class Upgrade {
    /**
     * The creep tries to upgrade the controller.
     * @returns False if couldnt upgrade (low on resource or no controller or wtv).
     */
    static run(creep: Creep): boolean {
        if (creep.store[RESOURCE_ENERGY] === 0) return false;

        if (!creep.room.controller) {
            console.error(`Tried to upgrade a non-existent controller in room ${creep.room.name}.`);
            return false;
        }
        
        const result = creep.upgradeController(creep.room.controller);
        switch (result) {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(creep.room.controller, { visualizePathStyle : {stroke: '#c0ff33'}});
            case 0:
                return true;
        }
        
        return false;
    }
}