var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

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
            //var sources = creep.room.find(FIND_SOURCES);
            let source = creep.pos.findClosestByRange(FIND_SOURCES);
            let spawn1 =  Game.spawns['Spawn1'];
            if(creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;