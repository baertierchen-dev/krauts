const utilCommon = require('utils.common');
let last;

let buildingTower = {
    /** @param {Creep} creep **/
    run: function (tower) {
        if (last === undefined) {
            last = 0;
        }

        let spawnEnergy = utilCommon.getAmountOfEnergyForSpawn(tower.room);
        if (tower) {
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            let wal;

            function checkStructure(structure) {
                return (structure.structureType === STRUCTURE_WALL && structure.hits < 5000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 130000) || (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_RAMPART);
            }

            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => checkStructure(structure)
                //&& ((structure.type === STRUCTURE_WALL).hits < 5000)
            });
            if (closestDamagedStructure && !closestHostile) {
                tower.repair(closestDamagedStructure);
            }

            // if (creep.hits < creep.memory.lastHits) {
            //     Game.notify('Creep ' + creep + ' has been attacked at ' + creep.pos + ' by ' + hostile.owner.username + '!');

            if (closestHostile) {
                tower.attack(closestHostile);
                if (last !== closestHostile.id){
                    Game.notify("Tower shoot at Hostile " + closestHostile.owner.username);
                    last = closestHostile.id;
                }


            }
        }
    }
};

module.exports = buildingTower;