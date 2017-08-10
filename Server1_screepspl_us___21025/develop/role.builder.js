let roleBuilder = {

        /** @param {Creep} creep **/
        run: function (creep) {
            try {
                const utilCommon = require('utils.common');

                // let buildWall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                //     filter: structure => {
                //         return (structure.structureType === STRUCTURE_WALL && structure.hits < 1000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 1000);
                //     }
                // });

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
                    let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length
                    // && !buildWall
                    ) {
                        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff17'}});
                        }
                    }
                    /* if (buildWall){
                     if(creep.repair(buildWall[0]) === ERR_NOT_IN_RANGE) {
                     creep.moveTo(buildWall[0]);
                     }
                     }*/
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
                        if(storages.length > 0){
                            let source = creep.room.find(FIND_SOURCES);
                            if (creep.harvest(source[1]) === ERR_NOT_IN_RANGE
                            ) {
                                creep.moveTo(source[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                            }
                        }else{

                        let fullContainer = creep.pos.findInRange(container, 3);
                        // let source = creep.pos.findClosestByRange(FIND_SOURCES);
                        let source = creep.room.find(FIND_SOURCES);
                        // if (creep.harvest(source) === ERR_NOT_IN_RANGE
                        if (creep.harvest(source[1]) === ERR_NOT_IN_RANGE
                            && !fullContainer.length
                        ) {
                            // creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                            creep.moveTo(source[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                        else if (creep.withdraw(fullContainer[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(fullContainer[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                        }
                    }
                }
            }
            catch (e) {
                console.log(e.stack);
            }
        }
    }
;

module.exports = roleBuilder;