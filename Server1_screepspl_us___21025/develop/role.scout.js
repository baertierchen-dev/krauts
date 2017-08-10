/**
 * Created by Joshi's-ASUS on 26.07.2017.
 */
const utilCommon = require('utils.common');
/**/

let roleScout = {
    /** @param {Creep} creep **/
    run: function (creep) {
        //spawn me
        //Game.spawns['Spawn1'].createCreep([MOVE], undefined, {role: 'scout'});
        let target1 = Game.rooms['E5S8'].find(FIND_FLAGS, {filter: flag => flag.name === 'NextRoom1'});
        if (creep.room === Game.rooms['E5S8']) {
            if (creep.pos !== target1.pos) {
                creep.moveTo(target1[0]);
            }
        } else {
            let target2 = creep.room.find(FIND_FLAGS, {filter: flag => flag.name === 'Guard2'});
            // creep.say("Bye!!");
            if (!(creep.pos.isEqualTo(target2[0].pos))) {
                creep.moveTo(target2[0]);

            }
        }
    }
};

module.exports = roleScout;