let utilCommon = {
    getAmountOfEnergyForSpawn: function (room) {
        let structures = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_EXTENSION
                    || structure.structureType === STRUCTURE_SPAWN
            }
        });
        let amount = 0;
        for (let i = 0; i < structures.length; i++) {
            amount = amount + structures[i].energy;
        }
        return amount;
    },
    hostileCreep: function (pos) {
        return pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    },
    // TODO: 19.07.2017 - @jkue - Add Ne
    getMiningSideFrom: function (creep) {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        let miningflags = creep.room.find(FIND_FLAGS, {filter: flag => {
            return flag.name.includes("Mining")
        }});

        // for (let flag in Memory.flags) {
        //     if(flag.name.includes("Mining")){
        //
        //     }
        //
        // }

        // let count = 0;
        // for (let flag in miningflags) {
        //     for (let harvester in harvesters) {
        //         if (harvester.memory.target[0].name === flag.name)
        //             count++;
        //     }
        // }
        creep.memory.target = miningflags.filter(flag => {
            return (_.sum(harvesters.filter(harvester => {
                let name = false;
                if (harvester.memory.target !== undefined) {
                    if(harvester.memory.target.name !== undefined){
                        name = harvester.memory.target.name === flag.name}
                }
                return name;
            })) < 3)
        })[0];

    }

};

module.exports = utilCommon;