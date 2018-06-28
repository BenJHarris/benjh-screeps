/**
 * Created by Benjamin Jed Harris on 26/06/2018.
 */

const build = require('build');

module.exports = (room) => {


    if (room.controller.level >= 2) {
        // check if there is enough extensions otherwise build more
        if (room.structureCount(STRUCTURE_EXTENSION) < CONTROLLER_STRUCTURES['extension'][room.getLevel()]) {
            build.extensions(room);
        }

        if (room.memory.roadsPlaced === false) {
            build.roads(room);
        }

    }

};