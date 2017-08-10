const utilCommon = require('utils.common');

let roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 4);
        if (hostiles.length > 0) {
            creep.say('Oh My God!!😨');
            creep.moveTo(Game.spawns['Spawn1']);
        }
        else
            this.work(creep);
    },
    work: function (creep) {
        let miningFlag = Game.flags[creep.memory.targetName];
        let onSpot = creep.memory.onSpot;
        if (creep.memory.onSpot === undefined) {
            creep.memory.onSpot = false;
        }
        // console.log("cpawning? " + creep.spawning + " targetName? " + creep.memory.targetName)
        // + " targetName? " + creep.memory.targetName == undefined);
        if (creep.spawning) {
            utilCommon.setMiningSideAsUsed(creep.name,creep.memory.targetName);
// /**/            console.log("Creep Target Name: " + creep.memory.targetName);

        }
        if (creep.ticksToLive < 2 || creep.hits < creep.hitsMax) {
            utilCommon.deleteMeOutOfMiningSide(creep.memory.targetName);
        }

        //Get nearest free Mining-Side
        // if (creep)
        //     utilCommon.getMiningSideFrom(creep);
        // if (creep.memory.target === undefined) {
        //     utilCommon.recycle(creep)
        // }
        let container = miningFlag.pos.lookFor(LOOK_STRUCTURES).filter(structure => {
            return structure.structureType === STRUCTURE_CONTAINER
        })[0];

        if (container) {

            if (container === undefined) {
                creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: structure => {
                        return structure.structureType === STRUCTURE_CONTAINER
                    }
                });
            }
            let source = container.pos.findInRange(FIND_SOURCES, 1)[0];

            if (onSpot === false) {
                // creep.say('Suche');
                // console.log(creep.memory.target);


                // console.log(creep.memory.target.pos.lookFor(LOOK_STRUCTURES).filter(structure => {
                //     return structure.structureType === STRUCTURE_CONTAINER
                // }));

                if (!creep.pos.isEqualTo(container.pos)) {
                    creep.moveTo(container.pos)
                } else {
                    creep.memory.onSpot = true;
                }
            } else {
                if (creep.carry.energy < creep.carryCapacity) {
                    creep.harvest(source);
                    // console.log(source);
                } else {
                    creep.transfer(container, RESOURCE_ENERGY);
                }
            }

        } else {
            if (miningFlag.pos.lookFor(LOOK_CONSTRUCTION_SITES) === undefined)
                miningFlag.pos.createConstructionSite(STRUCTURE_CONTAINER);
            else {
                if(creep.ticksToLive < 1381){
                    utilCommon.deleteMeOutOfMiningSide(creep.memory.targetName);
                    utilCommon.recycle(creep);
                }
            }
        }

    }

};

module.exports = roleMiner;