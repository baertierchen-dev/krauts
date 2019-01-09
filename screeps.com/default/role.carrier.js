/**
 * Created by Joshi's-ASUS on 15.07.2017.
 */
const utilCommon = require('utils.common');
let carry;

let roleCarrier = {
    /** @param {Creep} creep **/
    run: function (creep) {
        try {
            let hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 4);
            if (hostiles.length > 0) {
                creep.say('Oh My God!!😨');
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else {
                if (carry === undefined)
                    carry = false;
                this.work(creep);
            }
        } catch (e) {
            console.log(e.stack);
        }
//         /**
//         let carrying;
//         let target;
//
//         let miningSides = creep.room.find(FIND_FLAGS, {
//             filter: (flag) => {
//                 let look = flag.pos.findInRange(FIND_STRUCTURES, 0, {
//                     filter: (structure) => {
//                         return structure.structureType === STRUCTURE_CONTAINER
//                     }
//                 });
//                 return look.length
//             }
//         });
//          **/
//         let storage = Game.spawns["Spawn1"].pos.findClosestByPath(FIND_STRUCTURES, {
//             filter: (structure) => {
//                 return structure.structureType === STRUCTURE_STORAGE
//             }
//         });
// /**
//         function deleteMeOutOfUsedFlag(creepId) {
//             delete Memory.flags.usedBy.filter({
//                 filter: (id) => {
//                     return id === creepId
//                 }
//             });
//         }
//
//         //Delete me out of my used Flag if i Die
//         if (creep.ticksToLive < 1) {
//             carrying = false;
//             creep.say("I think i die... GOODBYE!");
//             deleteMeOutOfUsedFlag(creep.id);
//         }
//         console.log("Test1: "+ miningSides);
//          **/
//         if (creep.carry.energy < creep.carryCapacity) {
//             /**
//             //Do i have a Miningside? No? Get me the closest usable one!
//             if (carrying === false || carrying === undefined) {
//
//
//                 let closeUsableMiningSide = storage.pos.findClosestByPath(FIND_FLAGS, {
//                         filter: (flag) => {
//                             return miningSides.indexOf(flag) > -1
//                         }
//
//                     }
//                 );
//
//                 console.log("Test:" + closeUsableMiningSide);
//
//                 closeUsableMiningSide.memory.usedBy[creep.name] = creep.id;
//
//
//                 target = closeUsableMiningSide.pos.lookFor(LOOK_STRUCTURES).filter({
//                     filter: (structure) => {
//                         return structure.structureType === STRUCTURE_STORAGE
//                     }
//                 });
//                 carrying = true;
//                 //find nearestminingside where usedBy.length < 2 && usedBy does not contains creep.id
//             }
//
//
//             else if (carrying === true) {
//                 console.log(" CARRY:" + carrying);
//                 //is there a closer usable MiningSide than mine?
//                 let closeUsableMiningSide = storage.pos.findClosestByPath(miningSides.filter((miningSides.usedBy.length < 2 && miningSides.usedBy.contains(creep.id))));
//                 if (closeUsableMiningSide.pos !== target.pos) {
//                     deleteMeOutOfUsedFlag(creep.id);
//                     closeUsableMiningSide.usedBy.add(creep.id);
//                     target = closeUsableMiningSide.pos.lookFor(LOOK_STRUCTURES).filter({
//                         filter: (structure) => {
//                             return structure.structureType === STRUCTURE_STORAGE
//                         }
//                     });
//                 }
//             }
//             **/
//             let target =creep.room.find(FIND_STRUCTURES, {
//                 filter: (structure) => {
//                     return structure.structureType === STRUCTURE_CONTAINER
//                 }
//             });
//
//             if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//                 creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//
//         } else {
//             if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//                 creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
//             }
//
//         }
//         /**
//          else {
//             let targets = creep.room.find(FIND_STRUCTURES, {
//                 filter: (structure) => {
//                     return (structure.structureType === STRUCTURE_TOWER
//                         || structure.structureType === STRUCTURE_EXTENSION
//                         || structure.structureType === STRUCTURE_SPAWN) &&
//                         structure.energy < structure.energyCapacity;
//                 }
//             });
//             if(targets.length > 0) {
//                 if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//                 }
//             }
//         }
//          **/
    },
    work: function (creep) {
        // if (creep.fatigue > 0){
        //     utilCommon.setRoad(creep.pos)
        // }
        let CarryableFlag = Game.flags[creep.memory.targetName];

        if (creep.spawning) {
            utilCommon.setCarryableMiningSideAsUsed(creep.name, creep.memory.targetName);
            // console.log("Creep Target Name: " + creep.memory.targetName);

        }
        if (creep.ticksToLive < 50 || creep.hits < creep.hitsMax) {
            utilCommon.deleteMeOutOfCarryableSide(creep.memory.targetName);
            utilCommon.changeRole(creep);

        }

        if (creep.carry.energy === creep.carryCapacity) {
            carry = true;
        }
        if ((creep.carry.energy < creep.carryCapacity && creep.carry.energy === 0)) {
            let container = CarryableFlag.pos.lookFor(LOOK_STRUCTURES).filter(structure => {
                return structure.structureType === STRUCTURE_CONTAINER
            })[0];
            let storage = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0)
                }
            });


            if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }


        } else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });


            let targetsByAttack = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            let tower = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            // console.log(targets.length)
            let hostile = creep.room.find(FIND_HOSTILE_CREEPS);
            if (targets.length > 0 && hostile.length < 3) {
                let target = creep.pos.findClosestByPath(targets);
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
                }

            } else if (targetsByAttack.length > 0 && hostile.length > 2) {
                if (creep.transfer(tower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#ff000f'}});
                }
            } else {
                let storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_STORAGE
                    }
                });
                let carryGround;
                for (flag in Memory.flags) {
                    if (Game.flags[flag].name.includes("Upgrade")) {
                        carryGround = Game.flags[flag];
                    }
                }
                let upgradeContainer = carryGround.pos.lookFor(LOOK_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_STORAGE
                    }
                });

                if(upgradeContainer.length){
                    if (creep.transfer(upgradeContainer[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(upgradeContainer[0], {visualizePathStyle: {stroke: '#000000'}});
                    }
                }
                // let container =
                // console.log(storage);
                if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#000000'}});
                }
            }
        }
    },
    subCarrier: function (creep) {

        if (creep.ticksToLive < 50 || creep.hits < creep.hitsMax) {
            utilCommon.changeRole(creep);

        }

        if (creep.carry.energy === creep.carryCapacity) {
            carry = true;
        }


        if ((creep.carry.energy < creep.carryCapacity && creep.carry.energy === 0)) {
            let container = CarryableFlag.pos.lookFor(LOOK_STRUCTURES).filter(structure => {
                return structure.structureType === STRUCTURE_CONTAINER
            })[0];
            let storage = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0)
                }
            });


            if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
            }


        } else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });


            let targetsByAttack = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            let tower = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            // console.log(targets.length)
            let hostile = creep.room.find(FIND_HOSTILE_CREEPS);
            if (targets.length > 0 && hostile.length < 3) {
                let target = creep.pos.findClosestByPath(targets);
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
                }

            } else if (targetsByAttack.length > 0 && hostile.length > 2) {
                if (creep.transfer(tower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#ff000f'}});
                }
            } else {
                let storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_STORAGE
                    }
                });
                // console.log(storage);
                if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#000000'}});
                }
            }
        }
    }

};

module.exports = roleCarrier;