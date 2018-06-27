/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = (room) => {

    let requiredHarvesters = 5;
    let harvesterCreeps = room.findCreeps('harvester');

    if (harvesterCreeps.length < requiredHarvesters) {
        room.findSpawns()[0].spawnHarvester();
    }


};