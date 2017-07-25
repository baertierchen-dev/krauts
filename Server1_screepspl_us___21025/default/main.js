const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const buildingTower = require('building.tower');
let jamPackedBuildingsList = [];

module.exports.loop = function () {
    
    //console.log(Game.structures.map);
    let name;
    let tower = Game.getObjectById('f87b08e6618a286281bef998');
    buildingTower.run(tower);
    
     for(name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    
    if(harvesters.length < 2) {
        let newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        if(newName > 0 && newName !== null)
            console.log('Spawning new harvester: ' + newName);
    }
    
    if(builders.length < 5 && harvesters.length === 2 && FIND_CONSTRUCTION_SITES !== 0) {
        let newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
        if(newName > 0 && newName !== null)
            console.log('Spawning new builder: ' + newName);
    }else
        {   //Kill 2 Builder while there is nothing to build
            let count = 0;
            for(name in Game.creeps) {
                let creep = Game.creeps[name];
                if(creep.memory.role === 'upgrader' && count > 2) {
                    creep.suicide()
                }

            }
        }
    
    if(upgraders.length < 1 && harvesters.length === 2) {
        let newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        if(newName > 0 && newName !== null)
            console.log('Spawning new upgrader: ' + newName);
    }

    if(Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '✳️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    for(name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role === 'builder') {
            roleBuilder.run(creep);
        }
    }
}