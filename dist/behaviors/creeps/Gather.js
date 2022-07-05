"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreepsLibs = void 0;
var ScreepsLibs;
(function (ScreepsLibs) {
    var Behaviors;
    (function (Behaviors) {
        var Creeps;
        (function (Creeps) {
            class Gather {
                static run(creep) {
                    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                        if (creep.memory.gatheringStructureId && Memory.tombstonesTakenCareOfIds.includes(creep.memory.gatheringStructureId)) {
                            Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== creep.memory.gatheringStructureId);
                            delete creep.memory.gatheringStructureId;
                        }
                        return false;
                    }
                    let resourceDeposit = null;
                    let tombId = null;
                    // Get previous target if still holding enough material
                    if (creep.memory.gatheringStructureId) {
                        resourceDeposit = Game.getObjectById(creep.memory.gatheringStructureId);
                        if (resourceDeposit && resourceDeposit.store[RESOURCE_ENERGY] === 0) {
                            resourceDeposit = null;
                        }
                    }
                    if (!resourceDeposit) {
                        const tombsLeft = Memory.tombstonesIds.filter(el => !Memory.tombstonesTakenCareOfIds.includes(el));
                        if (tombsLeft[0]) {
                            tombId = tombsLeft[0];
                            resourceDeposit = Game.getObjectById(tombId);
                            Memory.tombstonesTakenCareOfIds.push(tombId);
                            creep.memory.gatheringStructureId = tombId;
                            creep.say('🪦 Collect');
                        }
                        else {
                            resourceDeposit = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: structure => (structure.structureType === STRUCTURE_STORAGE
                                    || structure.structureType === STRUCTURE_CONTAINER)
                                    && structure.store[RESOURCE_ENERGY] >= creep.store.getCapacity()
                            });
                        }
                    }
                    if (!resourceDeposit) {
                        const resourceDeposit = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                        if (!resourceDeposit) {
                            delete creep.memory.gatheringStructureId;
                            return false;
                        }
                        const result = creep.harvest(resourceDeposit);
                        if (result == ERR_NOT_IN_RANGE)
                            creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                        else if (result === ERR_BUSY) {
                            creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                            return true;
                        }
                        else if (result !== 0)
                            console.log /*.error*/('creep cannot gather resources : ' + result);
                        else
                            return true;
                    }
                    else {
                        creep.memory.gatheringStructureId = resourceDeposit.id;
                        const result = creep.withdraw(resourceDeposit, RESOURCE_ENERGY);
                        if (!tombId && Memory.tombstonesIds.includes(resourceDeposit.id)) // in case the id was already stored
                            tombId = resourceDeposit.id;
                        if (result == ERR_NOT_IN_RANGE) {
                            creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                            return true;
                        }
                        else if (result === ERR_BUSY) {
                            creep.moveTo(resourceDeposit, { visualizePathStyle: { stroke: '#ffaa00' } });
                            return true;
                        }
                        else if (result !== 0) {
                            console.log /*.error*/('creep cannot withdraw from source : ' + result);
                            return false;
                        }
                        if (tombId) {
                            //TODO: does not work.
                            if (resourceDeposit.store[RESOURCE_ENERGY] === 0)
                                console.log /*info*/('♻️ A dead\'s creep tombstone has been plundered.');
                            delete creep.memory.gatheringStructureId;
                            Memory.tombstonesTakenCareOfIds = Memory.tombstonesTakenCareOfIds.filter(t => t !== tombId && t !== null);
                        }
                        return true;
                    }
                    throw new Error('Should not be here.');
                }
            }
            Creeps.Gather = Gather;
        })(Creeps = Behaviors.Creeps || (Behaviors.Creeps = {}));
    })(Behaviors = ScreepsLibs.Behaviors || (ScreepsLibs.Behaviors = {}));
})(ScreepsLibs = exports.ScreepsLibs || (exports.ScreepsLibs = {}));
//# sourceMappingURL=Gather.js.map