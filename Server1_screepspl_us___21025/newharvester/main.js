const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleHealer = require('role.healer');
const roleCarrier = require('role.carrier');
const roleClaimer = require('role.claimer');
const roleGuard = require('role.guard');

const buildingTower = require('building.tower');
const utilCommon = require('utils.common');

let spawn1 = Game.spawns['Spawn1'];

let count;
try {
    module.exports.loop = function () {
        let room = Game.spawns['Spawn1'].room;
        let spawnEnergy = utilCommon.getAmountOfEnergyForSpawn(room);
        if (Memory.flags == null) {
            Memory.flags = {};
            let flags = Game.rooms['E5S8'].find(FIND_FLAGS);
            flags.forEach((flag) => {
                // Memory.flags[flag.name] = {};
                Memory.flags[flag.name] = flag;
                Memory.flags[flag.name].usedBy = {}
            });
        }
        // if (Memory.flags2 == null) {
        //     Memory.flags2 = {};
        //     let flags2= Game.rooms['E4S8'].find(FIND_FLAGS);
        //     flags2.forEach((flag) => {
        //         // Memory.flags[flag.name] = {};
        //         Memory.flags2[flag.name] = flag;
        //         Memory.flags2[flag.name].usedBy = {}
        //     });
        // }
        // Memory.flags = flags;

        let name;
        let tower = Game.getObjectById('596b77e5d3054200151de322');
        buildingTower.run(tower);
        let hostile = utilCommon.hostileCreep(tower.pos);


        // for (name in Memory.flags) {
        //     if (!Game.flags[name]) {
        //         delete Memory.flags[name];
        //         console.log('Clearing non-existing flag memory:', name);
        //     }
        // }

        try {
            //Safe Mod
            if (Game.spawns['Spawn1'].hits < Game.spawns['Spawn1'].hitsMax && tower.energy === 0 && hostile) {
                room.controller.activateSafeMode();
            }
        } catch (e) {
            console.log("Error in Safe Mod Try" + e);
        }

        for (name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        let healers = _.filter(Game.creeps, (creep) => creep.memory.role === 'healer');
        let claimers = _.filter(Game.creeps, (creep) => creep.memory.role === 'claimer');
        let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guard');

        //let carrier = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier');

        //Amount of Harvesters
        let hx=6;

        if (harvesters.length < hx) {
            if (spawnEnergy > 350) {
                let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {
                    role: 'harvester',
                    target: undefined,
                    carry: false
                });
                if (!(newName < 0))
                    console.log('Spawning new Big harvester: ' + newName);
            }
            else {
                let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {
                    role: 'harvester',
                    target: undefined,
                    carry: false
                });
                if (!(newName < 0))
                    console.log('Spawning new harvester: ' + newName);
            }
        }
        let constructionSides = room.find(FIND_CONSTRUCTION_SITES);

        if (builders.length < 5 && harvesters.length > (hx-2) && constructionSides.length && spawnEnergy > 350) {

            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, {role: 'builder'});
            if (!(newName < 0))
                console.log('Spawning new Big builder: ' + newName);
        } else if (!constructionSides.length) {
            //Kill 2 Builder while there is nothing to build
            for (name in Game.creeps) {
                let creep = Game.creeps[name];
                if (creep.memory.role === 'builder') {
                    console.log('Killing builder: ' + name);
                    creep.suicide();
                    count++;
                }

            }
        } else if (builders.length < 5 && harvesters.length > (hx-2) && constructionSides.length) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {
                role: 'builder'
            });
            if (!(newName < 0))
                console.log('Spawning new builder: ' + newName);
        }

        if (upgraders.length < 2 && harvesters.length > (hx-2)) {
            let newName = Game.spawns['Spawn1'].createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'upgrader'});
            if (!(newName < 0))
                console.log('Spawning new upgrader: ' + newName);
        }
        if (claimers.length < 1 && harvesters.length > (hx-2) && spawnEnergy > 800 && false) {
            let newName = Game.spawns['Spawn1'].createCreep([CLAIM, MOVE], undefined, {role: 'claimer',
                target: ''});
            if (!(newName < 0))
                console.log('Spawning new claimer: ' + newName);
        }
        if (guards.length < 1 && harvesters.length > (hx-2) && spawnEnergy > 510 && false) {
            let newName = Game.spawns['Spawn1'].createCreep([ATTACK,ATTACK,ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'guard',
                target: ''});
            if (!(newName < 0))
                console.log('Spawning new big guard: ' + newName&&false);
        }else if(guards.length < 1 && harvesters.length > (hx-2)&&false){
            let newName = Game.spawns['Spawn1'].createCreep([ATTACK,ATTACK, MOVE, MOVE], undefined, {role: 'guard',
                target: ''});
            if (!(newName < 0))
                console.log('Spawning new guard: ' + newName);

        }
        // if (carrier.length < 1 && harvesters.length > 2) {
        //     //let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'carrier'});
        //     let newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: 'carrier'});
        //     if (!(newName < 0))
        //         console.log('Spawning new big carrier: ' + newName);
        // }

        /**    if(healers.length < 1 && harvesters.length === 2) {
        let newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'healer'});
        if(!(newName < 0))
            console.log('Spawning new healer: ' + newName);
    }**/

        if (Game.spawns['Spawn1'].spawning) {
            let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            room.visual.text(
                '✳️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }

        for (name in Game.creeps) {
            let creep = Game.creeps[name];
            if (hostile) {
                roleHarvester.run(creep);
            } else {
                if (creep.memory.role === 'harvester') {
                    //roleHarvester.targetFlag;
                    utilCommon.getMiningSideFrom(creep);
                    roleHarvester.run(creep);
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
                if (creep.memory.role === undefined) {
                    creep.suicide()
                }
                // if (creep.memory.role === 'carrier') {
                //     roleCarrier.run(creep);
                // }
            }

        }
    }
}
catch (e) {
    console.loo("Error in you Main: " + e);
}