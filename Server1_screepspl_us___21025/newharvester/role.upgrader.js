const utilCommon = require('utils.common');

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {



        let hostile= utilCommon.hostileCreep(creep.pos);
        if(creep.hits < creep.memory.lastHits) {
            Game.notify('Creep '+creep+' has been attacked at '+creep.pos+ ' by ' +hostile.owner.username + '!');
        }

        if(creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⛏️ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#0018ff'}});
            }
        }
        else {
            //let sources = creep.room.find(FIND_SOURCES);
            let source = creep.pos.findClosestByRange(FIND_SOURCES);
            let spawn1 =  Game.spawns['Spawn1'];
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;