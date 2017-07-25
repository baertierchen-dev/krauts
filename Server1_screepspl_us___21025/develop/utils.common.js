let count;
let utilCommon = {
    getAmountOfEnergyForSpawn: function (room) {
        try {
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
        } catch (e) {
            console.log(e.stack);
        }
    },
    hostileCreep: function (pos) {
        return pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    },
    setRoad: function (position) {
        try {
            let isUsed = 0;
            let isThereARoad = position.lookFor(LOOK_STRUCTURES).filter(structure => {
                return structure.structureType === STRUCTURE_ROAD
            })[0];

            let isThereAConstructionSide = position.lookFor(LOOK_CONSTRUCTION_SITES)[0];
            // console.log("Is there a Road at pos "+position+" : "+ !isThereARoad);
            if (!isThereARoad && !isThereAConstructionSide) {
            //     if (false) {
                // let plannedRoadName = "PlannedRoadAtRoom:"+position.room.name+"X" + position.x +"Y"+position.y;

                // console.log("Is Memory undefined? "+ (Memory.plannedRoads == undefined));

                if (Memory.plannedRoads == undefined) {
                        Memory.plannedRoads = [{pos: position, usability: 0}];
                } else {
                    for (let r = 0; r < Memory.plannedRoads.length; r++) {

                        // console.log("Is road at "+r+" === position? " + ( JSON.stringify(Memory.plannedRoads[r].pos) ===  JSON.stringify(position)));

                        if (JSON.stringify(Memory.plannedRoads[r].pos) ===  JSON.stringify(position)){
                            isUsed++;
                            // console.log("Is Used was Incremented!");
                            if (Memory.plannedRoads[r].usability < 6) {
                                Memory.plannedRoads[r].usability++;
                            }
                            else {
                                // console.log("Set Road at " + position);
                                position.createConstructionSite(STRUCTURE_ROAD);
                                Memory.plannedRoads.splice(r,1);
                            }
                        }
                    }
                }
                if (isUsed === 0) {
                    Memory.plannedRoads.push({pos: position, usability: 0});
                }
            }

        } catch (e) {
            console.log(e.stack)
        }
        // pos.createConstructionSite(STRUCTURE_ROAD)

    },
    recycle: function (creep) {
        let target = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        if (target.recycleCreep(creep) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else {
            console.log('Recycle' + creep.memory.role + ': ' + creep.name);
        }
    },
    freeMiningSide: function () {
        try {
            //get vision, put flags on all sources,
            // if Game.getObjectById(flag.memory.mining) === undefined,
            // spawn miner, assign miner id to flag.memory.mining,
            // send it over to get started
            let miningflag;

            for (flag in Memory.flags) {
                if (Game.flags[flag].name.includes("Mining")) {
                    // console.log(Game.flags[flag].memory.usedBy)
                    // console.log(Game.flags[flag].usedBy)
                    if (Game.flags[flag].memory.usedBy === undefined) {
                        miningflag = Game.flags[flag];
                    }
                }
            }
            if (miningflag) {
                // Game.flags[miningflag.name].memory.usedBy = true;
                return [true, miningflag];
            } else
                return [false, {}];
        } catch (e) {
            console.log(e);
        }
    }, setMiningSideAsUsed(flag){
        Game.flags[flag].memory.usedBy = true;
    }, deleteMeOutOfMiningSide: function (flag) {
        try {
            delete Game.flags[flag].memory.usedBy;
        } catch (e) {
            console.log(e);
        }
    },
    findCarryableMiningSide: function () {
        try {
            //get vision, put flags on all sources,
            // if Game.getObjectById(flag.memory.mining) === undefined,
            // spawn miner, assign miner id to flag.memory.mining,
            // send it over to get started
            let carryGround;


            for (flag in Memory.flags) {

                if (Game.flags[flag].name.includes("Mining")) {
                    // console.log(Game.flags[flag].memory.carried == undefined)
                    // console.log(Game.flags[flag].memory.usedBy)
                    // console.log(Game.flags[flag].usedBy)
                    if (Game.flags[flag].memory.carried == undefined) {
                        carryGround = Game.flags[flag];
                    }
                }
            }

            if (carryGround) {
                // console.log(Memory.flags[carryGround.name].usedBy);
                // Memory.flags[carryGround.name].memory.usedBy = true;
                return [true, carryGround];
            } else
                return [false, {}];
        } catch (e) {
            console.log(e);
        }
    }, setCarryableMiningSideAsUsed(flag){
        Game.flags[flag].memory.carried = true;

    }, deleteMeOutOfCarryableSide: function (flag) {
        try {
            delete Game.flags[flag].memory.carried;
        } catch (e) {
            console.log(e);
        }
        // try {
        //
        //     // Memory.flags[flag.name] = Game.flags[flag.name];
        //     //get vision, put flags on all sources,
        //     // if Game.getObjectById(flag.memory.mining) === undefined,
        //     // spawn miner, assign miner id to flag.memory.mining,
        //     // send it over to get started
        //
        //
        //     //     // let miningflags = .find(FIND_FLAGS, {
        //     //     filter: flag => {
        //     //         return flag.name.includes("Mining")
        //     //     }
        //     // });
        // } catch (e) {
        //     console.log(e);
        // }
    }, waitForTicks: function (waitFor) {
        if (undefined == Memory.timeCount) {
            Memory.timeCount = 0;
            count = 0;
        }
        // console.log("Is true? "+(Memory.timeCount < waitFor && count != Memory.timeCount)+" Memory.timeCount "+Memory.timeCount+" < waitFor "+waitFor+" && undefined != count "+ count+" is true? "+(undefined != count));
        if (Memory.timeCount < waitFor && undefined != count) {
            console.log("Count. " + count + " memory: " + Memory.timeCount);
            count = count + 1;
            Memory.timeCount = count;
            return false;
        } else {
            delete Memory.timeCount;
            return true;
        }
    }
};

module.exports = utilCommon;