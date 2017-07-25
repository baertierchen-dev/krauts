let utilCommon = {
    getAmountOfEnergyForSpawn: function (room) {
        let structures = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType === STRUCTURE_EXTENSION
                    || structure.structureType === STRUCTURE_SPAWN
            }
        });
        let amount=0;
        for(let i=0; i<structures.length; i++){
            amount = amount + structures[i].energy;
        }
        return amount;
    }

};

module.exports = utilCommon;