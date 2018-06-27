/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports =  {

    init: () => {
        if (!Memory['creepCount']) {
            Memory['creepCount'] = 0;
        }
    },

    run: () => {
        for (const creep in Memory['creeps']) {
            if (!Game.creeps.hasOwnProperty(creep)) {
                delete Memory['creeps'][creep];
            }
        }
    }

};