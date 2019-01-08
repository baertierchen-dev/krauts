const roleHarvester = require('role.harvester');
const roleMiner = require('role.miner');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleHealer = require('role.healer');
const roleCarrier = require('role.carrier');
const roleClaimer = require('role.claimer');
const roleGuard = require('role.guard');
const roleSwarm = require('role.swarm');
const roleScout = require('role.scout');
 
const buildingTower = require('building.tower');
const utilCommon = require('utils.common');
const utilMemories = require('utils.memories');
const processSpawn = require('process.spawn');

module.exports.loop = function () {


    // if (!utilCommon.waitForTicks(10)) {
    //     if (Game.time % 2)
    //         console.log("Tick");
    //     else
    //         console.log("Tack");
    //
    // } else {
    //     console.log("It Worked!");
    // }

    // utilCommon.getMiningSide()

    let room = utilCommon.getRoom();
    const spawn1 = Game.spawns['Spawn1'];
    let spawnEnergy = utilCommon.getAmountOfEnergyForSpawn(room);
    utilMemories.saveFlags(room);

    // if (Game.time % 1000 === 0) {
    //     utilCommon.checkMiners();
    //     utilCommon.che();
    // }

    let name;
    let tower;
    let hostile = utilCommon.hostileCreep(spawn1.pos);
    let hostiles = spawn1.room.find(FIND_HOSTILE_CREEPS);

    try {
        //Safe Mod
        if (Game.spawns['Spawn1'].hits < Game.spawns['Spawn1'].hitsMax && tower.energy === 0 && hostile) {
            room.controller.activateSafeMode();
        }
    } catch (e) {
        console.log("Error in Safe Mod Try" + e.stack);
    }

    if (Game.time % 5 === 0) {
        utilCommon.checkForFalslyUsedFlag();
        for (name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                // console.log('Clearing non-existing creep memory:', name);
            }
        }
    }


    processSpawn.run();

    //Run Tower
    let towers = room.find(FIND_STRUCTURES, {
        filter: structure => {
            return structure.structureType === STRUCTURE_TOWER
        }
    });

    if (true) {
        for (let i = 0; i < towers.length; i++) {
            let tower = Game.getObjectById(towers[i].id);
            buildingTower.run(tower);
        }
    }

    //Run Specific Role of Creep
    for (name in Game.creeps) {
        let creep = Game.creeps[name];
        if (hostiles.length > 2 && spawnEnergy < 1000 && creep.memory.role !== 'healer' && creep.memory.role !== 'miner' && creep.memory.role !== 'carrier') {
            roleHarvester.run(creep);
        } else {
            if (creep.memory.role === 'harvester') {
                //roleHarvester.targetFlag;
                roleHarvester.run(creep);
            }
            if (creep.memory.role === 'miner') {
                //roleHarvester.targetFlag;
                // console.log(creep.name);
                roleMiner.run(creep);
            }

            if (creep.memory.role === 'carrier') {
                roleCarrier.run(creep);
            }
            if (creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep);
            }
            if (creep.memory.role === 'builder') {
                roleBuilder.run(creep);
            }
            if (creep.memory.role === 'healer') {
                roleHealer.run(creep);
            }
            if (creep.memory.role === 'claimer') {
                roleClaimer.run(creep);
            }
            if (creep.memory.role === 'guard') {
                roleGuard.run(creep);
            }
            if (creep.memory.role === 'swarm') {
                roleSwarm.run(creep);
            }
            if (creep.memory.role === 'scout') {

                roleScout.run(creep);
            }
            if (creep.memory.role === undefined) {
                creep.suicide()
            }
        }

    }
};
// }
// catch (e) {
//     console.loo("Error in you Main: " + e);
// }