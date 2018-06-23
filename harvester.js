/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = (creep) => {

    switch (creep.memory.status) {

        case ('mov_to_source'):
            if (creep.harvestSource() == 0) {
                creep.setStatus('harvesting');
            } else {
                creep.goToSource();
            }
            break;

        case ('harvesting'):
            if (creep.carry[RESOURCE_ENERGY] == creep.carryCapacity) {
                creep.setStatus('mov_to_cont');
            } else {
                creep.harvestSource();
            }
            break;

        // case ('mov_to_home'):
        //     if (creep.carry[RESOURCE_ENERGY] == 0) {
        //         creep.setStatus('mov_to_source');
        //     } else {
        //         if (creep.transfer(Game.getObjectById(creep.memory.home), RESOURCE_ENERGY) == 0) {
        //             creep.moveTo(Game.getObjectById(creep.memory.home));
        //         }
        //     }


        case ('mov_to_cont'):
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            } else if(creep.carry[RESOURCE_ENERGY] == 0) {
                creep.setStatus('mov_to_source');
            }
            break;
    }

};