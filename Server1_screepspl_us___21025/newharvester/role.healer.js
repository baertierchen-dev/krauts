let roleHealer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }
        if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repair');
        }

        function checkStructure(structure){
            return(structure.structureType === STRUCTURE_WALL && structure.hits < 5000) || (structure.hits < structure.hitsmax && structure.structureType !== STRUCTURE_WALL);
        }

        if (creep.memory.repairing) {
            let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => checkStructure(structure)
            });
            if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#00bd38'}});
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleHealer;
