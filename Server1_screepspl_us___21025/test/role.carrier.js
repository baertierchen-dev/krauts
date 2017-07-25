/**
 * Created by Joshi's-ASUS on 15.07.2017.
 */
//let _ = require('lodash');

let roleCarrier = {
    /** @param {Creep} creep **/
    run: function (creep) {
        /**
        let carrying;
        let target;

        let miningSides = creep.room.find(FIND_FLAGS, {
            filter: (flag) => {
                let look = flag.pos.findInRange(FIND_STRUCTURES, 0, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER
                    }
                });
                return look.length
            }
        });
         **/
        let storage = Game.spawns["Spawn1"].pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_STORAGE
            }
        });
/**
        function deleteMeOutOfUsedFlag(creepId) {
            delete Memory.flags.usedBy.filter({
                filter: (id) => {
                    return id === creepId
                }
            });
        }

        //Delete me out of my used Flag if i Die
        if (creep.ticksToLive < 1) {
            carrying = false;
            creep.say("I think i die... GOODBYE!");
            deleteMeOutOfUsedFlag(creep.id);
        }
        console.log("Test1: "+ miningSides);
         **/
        if (creep.carry.energy < creep.carryCapacity) {
            /**
            //Do i have a Miningside? No? Get me the closest usable one!
            if (carrying === false || carrying === undefined) {


                let closeUsableMiningSide = storage.pos.findClosestByPath(FIND_FLAGS, {
                        filter: (flag) => {
                            return miningSides.indexOf(flag) > -1
                        }

                    }
                );

                console.log("Test:" + closeUsableMiningSide);

                closeUsableMiningSide.memory.usedBy[creep.name] = creep.id;


                target = closeUsableMiningSide.pos.lookFor(LOOK_STRUCTURES).filter({
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_STORAGE
                    }
                });
                carrying = true;
                //find nearestminingside where usedBy.length < 2 && usedBy does not contains creep.id
            }


            else if (carrying === true) {
                console.log(" CARRY:" + carrying);
                //is there a closer usable MiningSide than mine?
                let closeUsableMiningSide = storage.pos.findClosestByPath(miningSides.filter((miningSides.usedBy.length < 2 && miningSides.usedBy.contains(creep.id))));
                if (closeUsableMiningSide.pos !== target.pos) {
                    deleteMeOutOfUsedFlag(creep.id);
                    closeUsableMiningSide.usedBy.add(creep.id);
                    target = closeUsableMiningSide.pos.lookFor(LOOK_STRUCTURES).filter({
                        filter: (structure) => {
                            return structure.structureType === STRUCTURE_STORAGE
                        }
                    });
                }
            }
            **/
            let target =creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_CONTAINER
                }
            });

            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        } else {
            if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
            }

        }
        /**
         else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER
                        || structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
         **/
    }

};

module.exports = roleCarrier;