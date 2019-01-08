const utilCommon = require('utils.common');

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        // if (creep.fatigue > 0){
        //     utilCommon.setRoad(creep.pos)
        // }

        if (creep.ticksToLive < 2) {
            console.log(creep.name + " died at Work as " +creep.memory.role +".");
            creep.say("Goodbye. :(")
        }
        let hostile = utilCommon.hostileCreep(creep.pos);
        if (creep.hits < creep.memory.lastHits) {
            Game.notify('Creep ' + creep + ' has been attacked at ' + creep.pos + ' by ' + hostile.owner.username + '!');
        }

        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⛏️ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#0018ff'}});
            }
            // if(creep.room.controller) {
            //      if(creep.signController(creep.room.controller, "^⨀ᴥ⨀^") == ERR_NOT_IN_RANGE) {
            //          creep.moveTo(creep.room.controller);
            //      }
            //  }
        }
        else {
            //let sources = creep.room.find(FIND_SOURCES);
            let container = creep.room.find(FIND_STRUCTURES, {
                filter: (i) => {
                    return (i.structureType === STRUCTURE_CONTAINER) &&
                        (i.store[RESOURCE_ENERGY] > 0)
                }
            });
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
};

module.exports = roleUpgrader;