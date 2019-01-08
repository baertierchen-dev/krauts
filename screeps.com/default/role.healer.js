let idleCounter;

let roleHealer = {
    /** @param {Creep} creep **/
    run: function (creep) {
        //TODO- Reperatur ohne Feindkontakt:
        //  Mit flagen auf Patrolienkurs schicken und auf Wegn in kleinem Radius Reperarieren.
        // Nur bei 25% Lifepoints in gewissen gebieten Extrwurst

        if(idleCounter==null){
            idleCounter=0;
        }
        creep.memory.idleCount = idleCounter;
        if (creep.ticksToLive < 2) {
            console.log(creep.name + " died at Work as " +creep.memory.role +".");
            creep.say("Goodbye. :(")
        }
        if (creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }
        if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            idleCounter = 0;
            creep.memory.repairing = true;
            creep.say('repair');
        }

        if (idleCounter >= 10 && creep.memory.repairing){
            let idlePoint= Game.rooms['W13S6'].find(FIND_FLAGS, {filter: flag => flag.name === 'Miner1'});
            if (creep.pos !== idlePoint.pos) {
                creep.moveTo(idlePoint[0]);
            }

        }

        let amountOfHostiles = creep.room.find(FIND_HOSTILE_CREEPS);

        function checkStructure(structure) {
            return (structure.structureType === STRUCTURE_WALL && structure.hits < 50000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 300000) ||
                (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_RAMPART);
        }

        function checkStructureWhileHostile(structure) {
            return (structure.structureType === STRUCTURE_WALL && structure.hits < 40000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 300000);
        }

        if (creep.memory.repairing) {
            if (amountOfHostiles < 3) {
                let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => checkStructure(structure)
                });

                // console.log(closestDamagedStructure);
                if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
                    idleCounter = 0;
                    creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#00bd38'}});
                } else {
                    let closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => checkStructureWhileHostile(structure)
                    });

                    // console.log(closestDamagedStructure);
                    if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
                        idleCounter = 0;
                        creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#bd0300'}});
                    }else{
                        idleCounter = 0;
                    }
                }
            }

        } else {
            let sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                idleCounter = 0;
                creep.moveTo(
                    sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        idleCounter++;
    }
};

module.exports = roleHealer;
