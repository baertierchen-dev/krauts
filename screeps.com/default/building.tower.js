const utilCommon = require('utils.common');
let last;

let buildingTower = {
    /** @param {Creep} creep **/
    run: function (tower) {
        if (last === undefined) {
            last = 0;
        }
        // console.log("Whats wrong");
        let spawnEnergy = utilCommon.getAmountOfEnergyForSpawn(tower.room);
        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        let buildWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: structure => {
                return (structure.structureType === STRUCTURE_WALL && structure.hits < 1000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 1000);
            }
        });
        let amountOfHostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        let closestHostileByRange5 = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 8);

        let tank = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: creep => {
                return (creep.getActiveBodyparts(TOUGH))
            }
        });

        let illCreep = tower.room.find(FIND_MY_CREEPS, {
            filter: creep => {
                return creep.hits < creep.hitsMax
            }
        });
        let wal;
        if (spawnEnergy > 800 && tower.energy > 500) {
            function checkStructure(structure) {
                return (structure.structureType === STRUCTURE_WALL && structure.hits < 500000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 1000000) ||
                    (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_RAMPART);
            }
        } else {
            function checkStructure(structure) {
                return (structure.structureType === STRUCTURE_WALL && structure.hits < 490000) || (structure.structureType === STRUCTURE_RAMPART && structure.hits < 900000)||
                    (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_RAMPART);
            }
        }
        function checkStructureWithoutWall(structure) {
            return (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL && structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_RAMPART);
        }

        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => checkStructure(structure)
            //&& ((structure.type === STRUCTURE_WALL).hits < 5000)
        });

        let closestDamagedStructureWithoutTower = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => checkStructureWithoutWall(structure)
            //&& ((structure.type === STRUCTURE_WALL).hits < 5000)
        });

        let invader;
        if (closestHostile && (closestHostile.owner !== undefined && closestHostile.owner !== null)) {
            invader = (closestHostile.owner.username === "Invader");
        } else {
            invader = false;
        }
        //Todo : repair wall schould be on
        if (buildWall) {
            tower.repair(buildWall);


        } else
        if (closestDamagedStructure && !closestHostile && spawnEnergy > 900) {
            tower.repair(closestDamagedStructure);
        } else if(closestDamagedStructureWithoutTower && !closestHostile){
            tower.repair(closestDamagedStructureWithoutTower);
        }
        // if (creep.hits < creep.memory.lastHits) {
        //     Game.notify('Creep ' + creep + ' has been attacked at ' + creep.pos + ' by ' + hostile.owner.username + '!');
        if (closestHostileByRange5.length > 0) {
            tower.attack(closestHostileByRange5[0]);
        }

        else if ((closestHostile && amountOfHostiles.length > 1) || (invader)) {
            tower.attack(closestHostile);
            Game.notify("Tower shoot at Hostile " + closestHostile.owner.username);
        }
        // if (illCreep) {
        //     tower.heal(illCreep);
        // }
    }
};

module.exports = buildingTower;