let utilBuilder = {
    getPrioConstruction: function(creep){
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        const conExtensions = targets.filter(function (e) {
            return e.structureType === "extension";
        });
        const conContainers = targets.filter(function (e) {
            return e.structureType === "container";
        });

        if(conExtensions.length){
            let closestCon = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => constructionSite.structureType === "extension"
            });
            if (creep.build(closestCon) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestCon, {visualizePathStyle: {stroke: '#00ff17'}});
            }
        }else if(conContainers.length){
            let closestCon = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => constructionSite.structureType === "container"
            });
            if (creep.build(closestCon) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestCon, {visualizePathStyle: {stroke: '#00ff17'}});
            }
        }else if(conContainers.length){
            let closestCon = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (constructionSite) => constructionSite.structureType === "rampart"
            });

            let posOfRampart = closestCon.pos;
            if (creep.build(closestCon) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestCon, {visualizePathStyle: {stroke: '#00ff17'}});
            }
            let rampart = posOfRampart.creep.pos.findInRange(rampart, 1);
            if(rampart && rampart.hits < 50000){

            }
        }else if (targets.length
        // && !buildWall
        ) {
            let closestCon = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (creep.build(closestCon) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestCon, {visualizePathStyle: {stroke: '#00ff17'}});
            }
        }
        /* if (buildWall){
         if(creep.repair(buildWall[0]) === ERR_NOT_IN_RANGE) {
         creep.moveTo(buildWall[0]);
         }
         }*/
    }
};

module.exports = utilBuilder;