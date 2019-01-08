const utilCommon = require('utils.common');
let guarding;

let roleSwarm = {

    /** @param {Creep} creep **/
    run: function (creep) {
        try {
            // if (Game.time % 12) {
            //     creep.say("Dead End!");
            // }

            let closestHostile = creep.room.find(FIND_FLAGS)[0].pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if (closestHostile.length > 0) {
                console.log("Swarm: " + creep.name + " found hostile: " + closestHostile[0].owner);
            }


            let closestHostileWithrangedAttack = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: creep => {
                    return (creep.getActiveBodyparts(ATTACK) || creep.getActiveBodyparts(RANGED_ATTACK))
                }
            });
            if (closestHostileWithrangedAttack) {
                console.log("Swarm: " + creep.name + " found closest hostile: " + closestHostileWithrangedAttack.owner);
            }
            if (guarding === undefined)
                guarding = false;

            let swarms = _.filter(Game.creeps, (creep) => creep.memory.role === 'swarm');

            if (!closestHostileWithrangedAttack) {
                // if (swarms.length > 2) {
                //     let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'NextRoom1'});
                //     if (creep.room === Game.rooms['E5S8']) {
                //         if (creep.pos !== target1.pos) {
                //             creep.moveTo(target1[0]);
                //         }
                //     } else if (!guarding) {
                //         let target2 = Game.rooms['E4S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'Guard1'});
                //         // creep.say("Bye!!");
                //         if (!(creep.pos.isEqualTo(target2[0].pos))) {
                //             creep.moveTo(target2[0]);
                //         } else {
                //             guarding = true;
                //         }
                //     } else {
                //
                //         if (closestHostile[0]) {
                //             creep.say("Go Away!");
                //             Game.notify("Tower shoot at Hostile " + closestHostile[0].owner.username);
                //             if (creep.rangedAttack(closestHostile[0]) === ERR_NOT_IN_RANGE) {
                //                 creep.moveTo(closestHostile[0]);
                //             }
                //         } else {
                //             guarding = false;
                //         }
                //     }
                // } else {
                //     creep.say('rangedAttack');
                    let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'Gather'});
                    if (!(creep.pos.isEqualTo(target1[0].pos))) {
                        creep.moveTo(target1[0]);
                    }
                // }

            } else {
                creep.say("Go Away!");
                if (creep.rangedAttack(closestHostileWithrangedAttack) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileWithrangedAttack);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

};


module.exports = roleSwarm;