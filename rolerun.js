/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const harvester = require('harvester');

module.exports = () => {

    for (name in Game.creeps) {
        creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                harvester(creep);
                break;
        }
    }

};