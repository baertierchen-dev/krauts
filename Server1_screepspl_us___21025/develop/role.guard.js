const utilCommon = require('utils.common');
let guarding;

let roleGuard = {

    /** @param {Creep} creep **/
    run: function (creep) {
        try {
            // if (Game.time % 12) {
            //     creep.say("Dead End!");
            // }

            /*let closestHostile = creep.room.find(FIND_FLAGS)[0].pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if (closestHostile.length > 0) {
                // console.log("Guard: " + creep.name + " found hostile: " + closestHostile[0].owner);
            }*/
            let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile != null && closestHostile.length > 0) {
                // console.log("Guard: " + creep.name + " found hostile: " + closestHostile[0].owner);
            }
            let closestHostileWithAttack = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: creep => {
                    return (creep.getActiveBodyparts(ATTACK) || creep.getActiveBodyparts(RANGED_ATTACK))
                }
            });
            if (closestHostileWithAttack) {
                // console.log("Guard: " + creep.name + " found closest hostile: " + closestHostileWithAttack.owner);
            }
            if (guarding === undefined)
                guarding = false;

            let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guard');

            // if (!closestHostileWithAttack) {
            if (!closestHostile) {
                if (guards.length > 0) {
                    /*let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'NextRoom1'});
                    if (creep.room === Game.rooms['E5S8']) {
                        if (creep.pos !== target1.pos) {
                            creep.moveTo(target1[0]);
                        }
                    } else */
                    if (!guarding) {
                        let target2 = creep.room.find(FIND_FLAGS, {filter: flag => flag.name === 'Guard'});
                        // creep.say("Bye!!");
                        if (!(creep.pos.isEqualTo(target2[0].pos))) {
                            creep.moveTo(target2[0]);
                        } else {
                            guarding = true;
                        }
                    } else {

                        if (closestHostile) {
                            creep.say("Go Away!");
                            // Game.notify("Tower shoot at Hostile " + closestHostile[0].owner.username);
                            if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(closestHostile);
                            }
                        } else {
                            guarding = false;
                        }
                    }
                } 
                /*else {
                    creep.say('Attack');
                    let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'Gather'});
                    creep.say("Waiting.:C");
                    if (!(creep.pos.isEqualTo(target1[0].pos))) {
                        creep.moveTo(target1[0]);
                    }
                }*/

            } else {
                //creep.say("attack!");
                // if (creep.attack(closestHostileWithAttack) === ERR_NOT_IN_RANGE) {
                //     creep.moveTo(closestHostileWithAttack);
                // }
                //console.log(creep.attack(closestHostile));
                if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile);
                }
            }
        // this.test(creep);
        } 
        catch (e) {
            console.log(e.stack);
        }
    }
    // ,
    // test: function (creep) {
    //
    //     let goals = _.map(creep.room.find(FIND_FLAGS, {filter: flag => {
    //         return flag.name === 'Guard1';
    //     }}));
    //
    //     let ret = PathFinder.search(
    //         creep.pos, goals,
    //         {
    //             // We need to set the defaults costs higher so that we
    //             // can set the road cost lower in `roomCallback`
    //             plainCost: 2,
    //             swampCost: 10,
    //
    //             roomCallback: function(roomName) {
    //
    //                 let room = Game.rooms[roomName];
    //                 // In this example `room` will always exist, but since
    //                 // PathFinder supports searches which span multiple rooms
    //                 // you should be careful!
    //                 if (!room) return;
    //                 let costs = new PathFinder.CostMatrix;
    //
    //                 room.find(FIND_STRUCTURES).forEach(function(struct) {
    //                     if (struct.structureType === STRUCTURE_ROAD) {
    //                         // Favor roads over plain tiles
    //                         costs.set(struct.pos.x, struct.pos.y, 1);
    //                     } else if (struct.structureType !== STRUCTURE_CONTAINER &&
    //                         (struct.structureType !== STRUCTURE_RAMPART ||
    //                         !struct.my)) {
    //                         // Can't walk through non-walkable buildings
    //                         costs.set(struct.pos.x, struct.pos.y, 0xff);
    //                     }
    //                 });
    //
    //                 // Avoid creeps in the room
    //                 room.find(FIND_CREEPS).forEach(function(creep) {
    //                     costs.set(creep.pos.x, creep.pos.y, 0xff);
    //                 });
    //
    //                 return costs;
    //             },
    //         }
    //     );
    //
    //     let pos = ret.path[0];
    //     creep.move(creep.pos.getDirectionTo(pos));
    // }

};


module.exports = roleGuard;