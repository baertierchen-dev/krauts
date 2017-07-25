let roleMiner = {

        /** @param {Creep} creep **/
        run: function (creep) {
            // TODO: 18.07.2017 - @jkue - Implement me
            try {
                const hostiles = creep.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
                if (hostiles.length > 0) {
                    creep.say('Oh My God!!😨');
                    creep.moveTo(Game.spawns['Spawn1']);
                }
                else {
                    this.work(creep);
                }
            } catch (e) {
                console.log(e);
            }
        },
        work: function (creep) {
            let target = creep.memory.target;
            if (Game.time % 25 === 0)
                creep.say('Yes, M\'Lord?...');
            //Creep should first move to his target
            if (creep.pos !== target.pos) {
                creep.moveTo(target.pos)
            } else
            //then he should mine
            if (creep.carry.energy < creep.carryCapacity) {
                let source = creep.pos.findClosestByRange(FIND_SOURCES);
                creep.harvest(source);
            } else
            //then he should transfer his energy to nearest
            {let source = creep.pos.findClosestByRange(FIND_SOURCES);

            }
        }
    }
;

module.exports = roleMiner;