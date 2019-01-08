const utilCommon = require('utils.common');

let roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep) {

        let hostile = utilCommon.hostileCreep(creep.pos);

        if (creep.hits < creep.memory.lastHits) {
            Game.notify('Creep ' + creep + ' has been attacked at ' + creep.pos + ' by ' + hostile.owner.username + '!');
        }


        let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'NextRoom1'});
        let target2 = Game.rooms['E4S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'Claim1'});
        if (creep.room === Game.rooms['E5S8']) {

            console.log(target1);
            if (creep.pos !== target1.pos) {
                creep.moveTo(target1[0]);
            }
        } else {
            //
            // if (creep.pos !== target2.pos) {
            //     creep.moveTo(target2[0]);
            // }
            let target = creep.room.controller;
            creep.say("Bye!!");
            console.log(creep.claimController(target));
            if (creep.claimController(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }else if (creep.reserveController(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleClaimer;