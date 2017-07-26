let guarding;

let roleGuard = {

    /** @param {Creep} creep **/
    run: function (creep) {
        try {
            // if (Game.time % 12) {
            //     creep.say("Dead End!");
            // }

            let closestHostile = creep.room.find(FIND_FLAGS)[0].pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if (closestHostile.length > 0) {
                console.log("Guard: " + creep.name + " found hostile: " + closestHostile[0].owner);
            }


            let closestHostileWithAttack = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: creep => {
                    return (creep.getActiveBodyparts(ATTACK) || creep.getActiveBodyparts(RANGED_ATTACK))
                }
            });
            if (closestHostileWithAttack) {
                console.log("Guard: " + creep.name + " found closest hostile: " + closestHostileWithAttack.owner);
            }

            if (guarding === undefined)
                guarding = false;

            let guards = _.filter(Game.creeps, (creep) => creep.memory.role === 'guard');

            if (!closestHostileWithAttack) {
                if (guards.length > 1) {
                    let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'NextRoom1'});
                    if (creep.room === Game.rooms['E5S8']) {
                        if (creep.pos !== target1.pos) {
                            creep.moveTo(target1[0]);
                        }
                    } else if (!guarding) {
                        let target2 = Game.rooms['E4S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'Guard1'});
                        // creep.say("Bye!!");
                        if (!(creep.pos.isEqualTo(target2[0].pos))) {
                            creep.moveTo(target2[0]);
                        } else {
                            guarding = true;
                        }
                    } else {
                        if (closestHostile[0]) {
                            creep.say("Go Away!");
                            Game.notify("Guard Attacked Hostile " + closestHostile[0].owner.username);
                            if (creep.attack(closestHostile[0]) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(closestHostile[0]);
                            }
                        } else {
                            guarding = false;
                        }
                    }
                } else {
                    creep.say('Attack');
                    let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'Gather'});
                    creep.say("Waiting.:C");
                    if (!(creep.pos.isEqualTo(target1[0].pos))) {
                        creep.moveTo(target1[0]);
                    }
                }

            } else {
                creep.say("attack!");
                if (creep.attack(closestHostileWithAttack) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileWithAttack);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

};


module.exports = roleGuard;