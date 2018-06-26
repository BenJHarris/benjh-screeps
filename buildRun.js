/**
 * Created by Benjamin Jed Harris on 26/06/2018.
 */

const build = require('build');

module.exports = (room) => {

    // check if there is enough extensions otherwise build more
    if (room.structureCount(STRUCTURE_EXTENSION) < CONTROLLER_STRUCTURES['extension'][room.getLevel()]) {
        console.log(room.structureCount(STRUCTURE_EXTENSION));
        console.log(CONTROLLER_STRUCTURES['extension'][room.getLevel()]);
        build.extension(room);
    }



};