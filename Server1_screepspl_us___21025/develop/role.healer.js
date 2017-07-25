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
        let amountOfHostiles = creep.room.find(FIND_HOSTILE_CREEPS);

        function checkStructure(structure) {
            return (structure.structureType === STRUCTURE_WALL && structure.hits < 1000000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 2000000) ||
                (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_RAMPART);
        }

        function checkStructureWhileHostile(structure) {
            return (structure.structureType === STRUCTURE_WALL && structure.hits < 900000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 1900000);
        }

        if (creep.memory.repairing) {
            if (amountOfHostiles < 3) {
                let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => checkStructure(structure)
                });

                // console.log(closestDamagedStructure);
                if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#00bd38'}});
                } else {
                    let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => checkStructureWhileHostile(structure)
                    });

                    // console.log(closestDamagedStructure);
                    if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#bd0300'}});
                    }
                }
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
