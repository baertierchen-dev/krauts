let roleBuilder = {

        /** @param {Creep} creep **/
        run: function (creep) {
            try {
                const utilCommon = require('utils.common');
                const utilBuilder = require('utils.builder');

                if (creep.ticksToLive < 2) {
                    console.log(creep.name + " died at Work as " + creep.memory.role + ".");
                    creep.say("Goodbye. :(")
                }

                let buildWall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: structure => {
                        return (structure.structureType === STRUCTURE_WALL && structure.hits < 10000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 10000);
                    }
                });

                let storage = creep.room.find(FIND_STRUCTURES, {
                    filter: structure => {
                        return (structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 49000)
                    }
                });

                let hostile = utilCommon.hostileCreep(creep.pos);
                if (creep.hits < creep.memory.lastHits) {
                    Game.notify('Creep ' + creep + ' has been attacked at ' + creep.pos + ' by ' + hostile.owner.username + '!');
                }
                creep.memory.lastHits = creep.hits;

                if (creep.memory.repairing && creep.carry.energy === 0) {
                    creep.memory.repairing = false;
                    creep.say('harvest');
                }
                if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
                    creep.memory.repairing = true;
                    creep.say('build');
                }

                if (creep.memory.repairing) {
                    //console.log(buildWall);
                    if (buildWall) {
                        if (creep.repair(buildWall) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(buildWall);
                        }
                    }else{
                        utilBuilder.getPrioConstruction(creep);
                    }
                }
                /*	    else {
                 var sources = creep.room.find(FIND_STRUCTURES, {
                 filter: (structure) => {
                 return (structure.structureType == STRUCTURE_EXTENSION
                 || structure.structureType == STRUCTURE_SPAWN) &&
                 structure.energy == structure.energyCapacity
                 }
                 });

                 if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                 }
                 }
                 }
                 };*/
                else {
                    let container = creep.room.find(FIND_STRUCTURES, {
                        filter: (i) => {
                            return (i.structureType === STRUCTURE_CONTAINER) &&
                                (i.store[RESOURCE_ENERGY] > 0)
                        }
                    });
                    if (storage.length > 0) {
                        if (creep.withdraw(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } else {
                        let storages = creep.room.find(FIND_STRUCTURES, {
                            filter: structure => {
                                return (structure.structureType === STRUCTURE_STORAGE)
                            }
                        });
                        if (storages.length > 0) {
                            //let source = creep.room.find(FIND_SOURCES);
                            let source = creep.pos.findClosestByRange(FIND_SOURCES);
                            if (creep.harvest(source) === ERR_NOT_IN_RANGE
                            ) {
                                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        } else {

                            let fullContainer = creep.pos.findInRange(container, 3);
                            let source = creep.pos.findClosestByRange(FIND_SOURCES);
                             if (creep.harvest(source) === ERR_NOT_IN_RANGE
                            //if (creep.harvest(source[1]) === ERR_NOT_IN_RANGE
                                && !fullContainer.length
                            ) {
                                // creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                            } else if (creep.withdraw(fullContainer[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(fullContainer[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }
                    }
                }
            } catch (e) {
                console.log("Something went wrong:" + e.stack);
            }
        }
    }
;

module.exports = roleBuilder;