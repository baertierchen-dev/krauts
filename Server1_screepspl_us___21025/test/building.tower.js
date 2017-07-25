let buildingTower = {
    /** @param {Creep} creep **/
    run: function(tower) {
        if(tower) {

            function checkStructure(structure){
                return(structure.structureType === STRUCTURE_WALL && structure.hits < 5000) || (structure.hits < structure.hitsMax && structure.structureType !== STRUCTURE_WALL);
            }
            let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => checkStructure(structure)
                //&& ((structure.type === STRUCTURE_WALL).hits < 5000)
            });

            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile && closestHostile.owner === "ags131") {
                tower.attack(closestHostile);
        }
    }
    }
};

module.exports = buildingTower;