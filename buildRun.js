/**
 * Created by Benjamin Jed Harris on 26/06/2018.
 */

const build = require('build');

module.exports = (room) => {

    if (!room.structureCount(STRUCTURE_EXTENSION) < CONTROLLER_STRUCTURES['extension'][room.getLevel()]) {
        build.extension(room);
    }
    


};