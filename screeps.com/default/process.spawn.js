/**
 * Created by Joshi's-ASUS on 24.07.2017.
 */
const utilCommon = require('utils.common');
const utilMemories = require('utils.memories');
const utilSpawn = require('utils.spawn');

let count;

let processSpawn = {
    run: function () {
        utilMemories.saveSpawnMemories();
        utilMemories.saveRoom(Memory.room);
        utilMemories.saveCreepRolesSize();
        utilMemories.saveCreepSpawnLimits();

        //helpers for Spawning

        /* ############### MINER ################*/
        utilMemories.saveMinerMemories();

        /* ############### CARRIER ################*/
        let isOneCarryableFree = utilCommon.findCarryableMiningSide()[0];
        // let isOneCarryableFree = false;
        let carrySide = utilCommon.findCarryableMiningSide()[1];
        // console.log(Game.time % 10===0);
        // console.log("!spawn1.spawning: "+ (!spawn1.spawning));
        // console.log("!spawn1.spawning: "+ (!spawn1.spawning) +" Game.time % 10 === 0: "+ (Game.time % 10 === 0));
        // console.log("isOneMiningSideFree: "+ (isOneMiningSideFree) +" spawnEnergy > 600: "+ (spawnEnergy > 600));
        //console.log(builders.length < builderX && enoughHarvester && constructionSides.length > 0 && isNotSpawning);


        utilSpawn.nextCreepRole();

        /*        if (Memory.harvesters < Memory.harvesterX) {
                    spawn1.memory.NEXT_SPAWN = "harvester"
                } else if (Memory.enoughHarvester && Memory.isOneMiningSideFree && Memory.isOneMiningSideWithContainer && isNotSpawning) {
                    spawn1.memory.NEXT_SPAWN = "miner"
                } else if (!Memory.isOneMiningSideFree && isOneCarryableFree && Memory.enoughHarvester && true
                    && utilCommon.notEnoughCarrier()
                    && isNotSpawning) {
                    spawn1.memory.NEXT_SPAWN = "carrier"
                } else if (Memory.builders < Memory.builderX && Memory.enoughHarvester && constructionSides.length > 0 && isNotSpawning) {
                    spawn1.memory.NEXT_SPAWN = "builder"
                } else if (isNotSpawning && Memory.upgraders < Memory.upgraderX && Memory.enoughHarvester) {
                    spawn1.memory.NEXT_SPAWN = "upgrader"
                } else if (isNotSpawning && !isOneCarryableFree && !Memory.isOneMiningSideFree && Memory.healers < 1 && Memory.enoughHarvester) {
                    spawn1.memory.NEXT_SPAWN = "healer"
                } else if (isNotSpawning && Memory.guards < 1 && Memory.enoughHarvester && true) {
                    spawn1.memory.NEXT_SPAWN = "guard"
                } else {
                    spawn1.memory.NEXT_SPAWN = "Nothing";
                }*/

        if (Memory.harvesters < Memory.harvesterX) {
            let targets = Memory.spawn1.room.find(FIND_SOURCES);
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {
                role: 'harvester',
                target: targets[Game.time % 2],
                carry: false
            });
            if (!(newName < 0))
                console.log('Spawning new harvester: ' + newName);
        } else if (Memory.enoughHarvester && Memory.isOneMiningSideFree && Memory.isOneMiningSideWithContainer && Memory.spawnEnergy > 600 && Memory.isNotSpawning) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], undefined, {
                role: 'miner',
                targetName: Memory.miningSide.name
            });
            if (!(newName < 0))
                console.log('Spawning new big miner: ' + newName);
        } else if (Memory.enoughHarvester && Memory.isOneMiningSideFree && Memory.isOneMiningSideWithContainer && Memory.spawnEnergy > 549 && Memory.isNotSpawning) {
            let newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY], undefined, {
                role: 'miner',
                targetName: Memory.miningSide.name
            });
            if (!(newName < 0))
                console.log('Spawning new medium miner: ' + newName);
        } else if (Memory.enoughHarvester && Memory.isOneMiningSideFree && Memory.isOneMiningSideWithContainer && Memory.isNotSpawning) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {
                role: 'miner',
                targetName: Memory.miningSide.name
            });
            if (!(newName < 0))
                console.log('Spawning new miner: ' + newName);
        } else if (!Memory.isOneMiningSideFree && isOneCarryableFree && Memory.spawnEnergy > 1200 && Memory.enoughHarvester && true
            && utilCommon.notEnoughCarrier()
            && Memory.isNotSpawning
        ) {
            let newName = Game.spawns['Spawn1'].createCreep([
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                MOVE, MOVE, MOVE, MOVE, MOVE

            ], undefined, {
                role: 'carrier',
                targetName: carrySide.name
            });
            if (!(newName < 0))
                console.log('Spawning new big carrier: ' + newName);
        } else if (!Memory.isOneMiningSideFree && isOneCarryableFree && Memory.spawnEnergy > 549 && Memory.enoughHarvester && true
            && utilCommon.notEnoughCarrier()
            && Memory.isNotSpawning
        ) {
            let newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {
                role: 'carrier',
                targetName: carrySide.name
            });
            if (!(newName < 0))
                console.log('Spawning new medium carrier: ' + newName);
        } else if (!Memory.isOneMiningSideFree && isOneCarryableFree && Memory.enoughHarvester && true
            && utilCommon.notEnoughCarrier()
            && Memory.isNotSpawning
        ) {
            let newName = Game.spawns['Spawn1'].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], undefined, {
                role: 'carrier',
                targetName: carrySide.name
            });
            if (!(newName < 0))
                console.log('Spawning new carrier: ' + newName);
        } else if (Memory.isNotSpawning &&
            // !isOneCarryableFree && !Memory.isOneMiningSideFree &&
            Memory.upgraders < Memory.upgraderX && Memory.enoughHarvester && Memory.spawnEnergy > 799) {
            let newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY], undefined, {role: 'upgrader'});
            if (!(newName < 0))
                console.log('Spawning new BIG upgrader: ' + newName);
        } else if (Memory.isNotSpawning &&
            // !isOneCarryableFree && !Memory.isOneMiningSideFree &&
            Memory.upgraders < Memory.upgraderX && Memory.enoughHarvester && Memory.spawnEnergy > 549) {
            let newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, WORK, WORK, WORK], undefined, {role: 'upgrader'});
            if (!(newName < 0))
                console.log('Spawning new Medium upgrader: ' + newName);
        } else if (Memory.isNotSpawning &&
            // !isOneCarryableFree && !Memory.isOneMiningSideFree &&
            Memory.upgraders < Memory.upgraderX && Memory.enoughHarvester) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
            if (!(newName < 0))
                console.log('Spawning new upgrader: ' + newName);
        } else if (utilSpawn.isHealerSpawnable()) {
            let size = utilSpawn.isHealerSpawnable();
            if (size === "TIER2") {
                let newName = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'healer'});
                if (!(newName < 0))
                    console.log('Spawning new healer: ' + newName);
            } else {
                let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'healer'});
                if (!(newName < 0))
                    console.log('Spawning new healer: ' + newName);
            }
        } else if (Memory.isNotSpawning && !isOneCarryableFree && !Memory.isOneMiningSideFree && Memory.claimers < 1 && Memory.enoughHarvester && Memory.spawnEnergy > 800 && false) {
            let newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE], undefined, {
                role: 'claimer',
                target: ''
            });
            if (!(newName < 0))
                console.log('Spawning new claimer: ' + newName);
        } else if (Memory.isNotSpawning && Memory.guards < 1 && Memory.enoughHarvester && Memory.spawnEnergy > 510 && true) {
            let newName = Game.spawns['Spawn1'].createCreep([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], undefined, {
                role: 'guard',
                target: ''
            });
            if (!(newName < 0))
                console.log('Spawning new big guard: ' + newName);
        } else if (Memory.isNotSpawning && Memory.guards < 1 && Memory.enoughHarvester && true) {
            let newName = Game.spawns['Spawn1'].createCreep([ATTACK, ATTACK, MOVE, MOVE], undefined, {
                role: 'guard',
                target: ''
            });
            if (!(newName < 0))
                console.log('Spawning new guard: ' + newName);
        } else if (Memory.isNotSpawning && Memory.swarms < 3 && Memory.enoughHarvester && Memory.spawnEnergy > 510 && false) {
            let newName = Game.spawns['Spawn1'].createCreep([RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE], undefined, {
                role: 'swarm',
                target: ''
            });
            if (!(newName < 0))
                console.log('Spawning new big swarm: ' + newName);
        } else if (Memory.isNotSpawning && Memory.swarms < 3 && Memory.enoughHarvester && false) {
            let newName = Game.spawns['Spawn1'].createCreep([RANGED_ATTACK, MOVE], undefined, {
                role: 'swarm',
                target: ''
            });
            if (!(newName < 0))
                console.log('Spawning new swarm: ' + newName);

        } //else if (!isOneCarryableFree && !Memory.isOneMiningSideFree && Memory.builders < Memory.builderX && Memory.enoughHarvester && Memory.constructionSides > 0 && Memory.spawnEnergy > 600 && Memory.isNotSpawning) {
        else if (utilSpawn.isBuilderSpawnable()) {
            let size = utilSpawn.isBuilderSpawnable();
            if (size === "TIER3") {
                let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], undefined, {role: 'builder'});
                if (!(newName < 0))
                    console.log('Spawning new Big builder: ' + newName);
            } else if (size === "TIER2") {
                let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {
                    role: 'builder'
                });
                if (!(newName < 0))
                    console.log('Spawning new builder: ' + newName);
            } else if (size === "TIER1") {
                let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {
                    role: 'builder'
                });
                if (!(newName < 0))
                    console.log('Spawning new builder: ' + newName);
            } else if (!Memory.constructionSides) {
                //Change role  of Builder while there is nothing to build
                for (const name in Game.creeps) {
                    let creep = Game.creeps[name];
                    if (creep.memory.role === 'builder') {
                        utilCommon.changeRole(creep);
                        count++;
                    }
                }
            }

            if (Game.spawns['Spawn1'].spawning) {
                let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                Memory.room.visual.text(
                    '✳️' + spawningCreep.memory.role,
                    Game.spawns['Spawn1'].pos.x + 1,
                    Game.spawns['Spawn1'].pos.y,
                    {align: 'left', opacity: 0.8});
            }
        }
    }
};

module.exports = processSpawn;