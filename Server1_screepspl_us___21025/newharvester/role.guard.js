const utilCommon = require('utils.common');
let guarding;

let roleGuard = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if(Game.time%12){
            creep.say("Dead End!");
        }

        let closestHostile = creep.room.find(FIND_FLAGS)[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        let closestHostileWithAttack = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: creep => {
            return (creep.getActiveBodyparts(ATTACK) !== 0 || creep.getActiveBodyparts(RANGED_ATTACK) !== 0)
        }});

        if (guarding === undefined)
            guarding = false;


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
                Game.notify("Tower shoot at Hostile "+closestHostile[0].owner.username);
                if (creep.attack(closestHostile[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostile[0]);
                }
            }else {
                guarding=false;
            }
        }
    }
};

module.exports = roleGuard;