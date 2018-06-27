/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = (room) => {

    let requiredHarvesters = 5;
    let harvesterCreeps = room.findCreeps('harvester');

    console.log(harvesterCreeps.length);
    console.log(requiredHarvesters);

    if (harvesterCreeps.length < requiredHarvesters) {
        console.log('a');
        room.findSpawns()[0].spawnHarvester();
    }


};