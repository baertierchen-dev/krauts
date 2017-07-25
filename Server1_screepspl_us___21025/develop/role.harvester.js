const utilCommon = require('utils.common');
let carry;

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let carry;
        // TODO: 18.07.2017 - @jkue - Implement me
        try {
            const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 4);
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
            console.log(e);
        }
    },
    work: function (creep) {

        // if (creep.fatigue > 0) {
        //     utilCommon.setRoad(creep.pos)
        // }

        let spawnEnergy = utilCommon.getAmountOfEnergyForSpawn(creep.room);
        // creep.say("Hello!")
        // if (creep.fatigue > 0){
        //     utilCommon.setRoad(creep.pos)
        // }
        // if (Game.time % 7 === 0)
        //     creep.say('Work, Work...');
        if (creep.ticksToLive < 1) {
            creep.say("Goodbye. :(")
        }
        if (creep.carry.energy === creep.carryCapacity) {
            carry = true;
        }

        if ((creep.carry.energy < creep.carryCapacity)) {
            let source;
            let storage = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType === STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 0)
                }
            });


            let fullContainer = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0)
                }
            });
            let energyOnGround = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3);
            if (energyOnGround.length > 0) {
                if (creep.pickup(energyOnGround[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyOnGround[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            let towerEnergy = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return (structure.structureType === STRUCTURE_TOWER && structure.energy < 800)
                }
            });
            // if(spawnEnergy < 1000 && storage || storage && towerEnergy.length > 0){
            //     if (creep.withdraw(storage[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            //         creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            //     }
            // }else{
            if (fullContainer.length > 0) {
                // console.log(creep.withdraw(fullContainer[0], RESOURCE_ENERGY));/**/
                if (creep.withdraw(fullContainer[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(fullContainer[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            } else {
                if (creep.memory.target === undefined || creep.memory.target === null) {
                    source = creep.pos.findClosestByRange(FIND_SOURCES);
                } else {
                    source = creep.pos.findClosestByRange(FIND_SOURCES, {filter: source => source.id === creep.memory.target.id});
                }
                // console.log("Creep: "+creep.name+ " source: "+source);
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // }

            // console.log(fullContainer.length);


        }
        else {
            let tower = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ( structure.structureType === STRUCTURE_EXTENSION
                        || structure.structureType === STRUCTURE_SPAWN
                        || structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_STORAGE) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            let targetsByAttack = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            let hostile = utilCommon.hostileCreep(creep.pos);


            if (creep.hits < creep.memory.lastHits) {
                Game.notify('Creep ' + creep + ' has been attacked at ' + creep.pos + ' by ' + hostile.owner.username + '!');
            }
            if (targets.length > 0 && !hostile) {
                let target = creep.pos.findClosestByPath(targets);
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#000000'}});
                }

            } else if (targetsByAttack.length > 0 && hostile) {
                if (tower.length > 0) {
                    if (creep.transfer(tower[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower[0], {visualizePathStyle: {stroke: '#ff000f'}});
                    }
                } else {
                    if (creep.transfer(targetsByAttack[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetsByAttack[0], {visualizePathStyle: {stroke: '#ff0010'}});
                    }
                }
            }

            if (creep.carry.energy === 0) {
                carry = false;
            }


        }
    }
};

module.exports = roleHarvester;