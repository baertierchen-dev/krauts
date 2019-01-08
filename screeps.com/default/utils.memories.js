const utilSpawn = require('utils.spawn');
const utilCommon = require('utils.common');
/* global creeps, Memory, Game, _,  */
/** @namespace Game.creeps*/

let utilMemories = {
    saveCreepRolesSize: function () {
        //TODO - Could be a switch case - so no more obsolete filtering trough all creeps for every role
        Memory.harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length;
        Memory.miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner').length;
        Memory.builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder').length;
        Memory.upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length;
        Memory.healers = _.filter(Game.creeps, (creep) => creep.memory.role === 'healer').length;
        Memory.guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guard').length;
        Memory.claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer').length;
        Memory.swarms = _.filter(Game.creeps, (creep) => creep.memory.role === 'swarm').length;
    },
    saveCreepSpawnLimits: function () {
        Memory.harvesterX = utilSpawn.calculateHarvesterLimit();
        Memory.minerX = 2;
        Memory.builderX = 3;
        Memory.healerX = 3;
        Memory.upgraderX = 1;

        Memory.enoughHarvester = (Memory.harvesters >= (Memory.harvesterX - 2));
        Memory.enougMiner = (Memory.miners > 0);
    },
    saveFlags: function (room) {
        Memory.flags = {};
        let flags = room.find(FIND_FLAGS);
        flags.forEach((flag) => {
            // Memory.flags[flag.name] = {};
            Memory.flags[flag.name] = flag;
            // Memory.flags[flag.name].usedBy = {}
        });
    },
    saveMinerMemories: function () {
        Memory.isOneMiningSideFree = utilCommon.freeMiningSide()[0];
        Memory.miningSide = utilCommon.freeMiningSide()[1];
        Memory.isOneMiningSideWithContainer = utilCommon.checkForContainerAtMiningSide(Memory.miningSide.name);
        Memory.constructionSides = Memory.room.find(FIND_CONSTRUCTION_SITES).length;
    },
    saveRoom: function (room) {
        Memory.room = room;
    },
    saveSpawnMemories: function () {
        Memory.spawn1 = Game.spawns['Spawn1'];
        Memory.room = utilCommon.getRoom();


        Memory.isNotSpawning = Memory.spawn1.spawning === null;
        Memory.spawnEnergy = utilCommon.getAmountOfEnergyForSpawn(Memory.room);
    }
};

module.exports = utilMemories;