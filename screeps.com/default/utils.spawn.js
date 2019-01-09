const utilCommon = require('utils.common');

let utilSpawn = {
    nextCreepRole: function () {
        let spawn1 = Game.spawns['Spawn1'];

       // console.log("isNotSpawning: " + Memory.isNotSpawning);
        //console.log("Memory.healers < Memory.healerX : " + (Memory.healers < Memory.healerX));
        //console.log("(Memory.builders === 0 || Memory.healers < 1) : " + (Memory.builders === 0 || Memory.healers < 1));

        // console.log(" isOneMiningSideFree:" + !Memory.isOneMiningSideFree);
        // console.log("healers<1 :" + (Memory.healers < 1));
        // console.log("enoughHarvester :" + Memory.enoughHarvester);


//             Memory.healers < Memory.healerX && (Memory.builders === 0 || Memory.healers < 1) && Memory.enoughHarvester)

        if (Memory.harvesters < Memory.harvesterX) {
            spawn1.memory.NEXT_SPAWN = "harvester"
        } else if (Memory.enoughHarvester && Memory.isOneMiningSideFree && Memory.isOneMiningSideWithContainer && Memory.isNotSpawning) {
            spawn1.memory.NEXT_SPAWN = "miner"
        } else if (!Memory.isOneMiningSideFree && Memory.isOneCarryableFree && Memory.enoughHarvester && true
            && utilCommon.notEnoughCarrier()
            && Memory.isNotSpawning) {
            spawn1.memory.NEXT_SPAWN = "carrier"
        } else if (Memory.builders < Memory.builderX && Memory.enoughHarvester && Memory.constructionSides > 0 && Memory.isNotSpawning) {
            spawn1.memory.NEXT_SPAWN = "builder"
        } else if (Memory.isNotSpawning && Memory.upgraders < Memory.upgraderX && Memory.enoughHarvester) {
            spawn1.memory.NEXT_SPAWN = "upgrader"
        } else if (Memory.isNotSpawning &&
            //!Memory.isOneCarryableFree &&
            //!Memory.isOneMiningSideFree &&
            Memory.healers < Memory.healerX && (Memory.builders === 0 || Memory.healers < 1) && Memory.enoughHarvester) {
            spawn1.memory.NEXT_SPAWN = "healer"
        } else if (Memory.isNotSpawning && Memory.guards < 1 && Memory.enoughHarvester && true) {
            spawn1.memory.NEXT_SPAWN = "guard"
        } else {
            spawn1.memory.NEXT_SPAWN = "Nothing";
        }
    },
    calculateHarvesterLimit: function () {
        if (Memory.miners > 1) {
            return 2;
        } else {
            return 4;
        }
    },
    isHealerSpawnable: function () {
        let needHealers = Memory.healers < Memory.healerX;
        let isNotSpawning = Memory.isNotSpawning;
        let shouldBeOneHealerOrNoBuilder = (Memory.builders === 0 || Memory.healers < 1);
        // was Memory.spawnEnergy > 299 && Memory.isNotSpawning && !isOneCarryableFree &&
        //             //!Memory.isOneMiningSideFree &&
        //             Memory.healers < Memory.healerX && Memory.enoughHarvester && true

        //TODO - TIER 2 spawnen wenn keine anderen Spawnaufträge nötig sind und genügend Energiekapazitäten zu verfügung stehen
        if (needHealers && isNotSpawning && shouldBeOneHealerOrNoBuilder) {
            if (this.spawnEnergyBiggerThan(549)) {
                return "TIER2";
            } else {
                return "TIER1";
            }
        }
    },
    isBuilderSpawnable: function () {


        let needBuilder = Memory.builders < Memory.builderX;
        let isNotSpawning = Memory.isNotSpawning;
        let hasWork = Memory.constructionSides > 0;


        // was Memory.spawnEnergy > 299 && Memory.isNotSpawning && !isOneCarryableFree &&
        //             //!Memory.isOneMiningSideFree &&
        //             Memory.healers < Memory.healerX && Memory.enoughHarvester && true

        //TODO - TIER 2 spawnen wenn keine anderen Spawnaufträge nötig sind und genügend Energiekapazitäten zu verfügung stehen
        if (needBuilder && isNotSpawning && hasWork) {
            if (this.spawnEnergyBiggerThan(549)) {
                return "TIER3";
            } else if (this.spawnEnergyBiggerThan(349)){
                return "TIER2";
            } else {
                return "TIER1";
            }
        }
    },
    spawnEnergyBiggerThan: function (energy) {
        return Memory.spawnEnergy > energy;
    }
    ,
    harvesterSpawnable: function () {

    }
    ,
    spawnCreep: function () {

    }
};

module.exports = utilSpawn;