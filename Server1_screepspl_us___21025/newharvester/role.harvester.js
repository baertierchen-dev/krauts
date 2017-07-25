const utilCommon = require('utils.common');
let container;
let source;

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let carry;
        // TODO: 18.07.2017 - @jkue - Implement me
            const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if (hostiles.length > 0) {
                creep.say('Oh My God!!😨');
                creep.moveTo(Game.spawns['Spawn1']);
            }
            else {
                if(carry===undefined)
                    carry = false;
                this.work(creep);
            }
    },
    work: function (creep) {
        let onSpot = creep.memory.onSpot;
        if (creep.memory.onSpot === undefined){
            creep.memory.onSpot = false;
        }
        // console.log(onSpot);

        if(onSpot === false){
            // creep.say('Suche');
            utilCommon.getMiningSideFrom(creep);
            // console.log(creep.memory.target);

            container = creep.memory.target.pos.lookFor(LOOK_STRUCTURES).filter(structure => {return structure.structureType === STRUCTURE_CONTAINER})[0];
            source = container.pos.findInRange(FIND_SOURCES, 1)[0];

            if(!creep.pos.isEqualTo(container.pos)){
                creep.moveTo(container.pos)
            }else{
                creep.memory.onSpot=true;
            }
        }else{
            if(creep.carry.energy < creep.carryCapacity){
                creep.harvest(source);
                console.log(creep.harvest(source));
            }else{
                creep.transfer(container , RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleHarvester;