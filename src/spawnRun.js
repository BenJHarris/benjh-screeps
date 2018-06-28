/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = (room) => {

    let requiredMiners = (() => {
        let total = 0;

        for (let source of room.findSources()) {
            if (!(source.getAssignedCreeps('miner').length > 0)) {
                total ++;
            }
        }
        return total;
    })();

    let minerCreeps = room.findCreeps('miner');

    if (minerCreeps.length < requiredMiners) {
        room.findSpawns()[0].spawnMiner();
    }

    let requiredHarvesters = (() => {
        let total = 0;

        for (let source of room.findSources()) {
            if (!(source.getAssignedCreeps('miner').length > 0)) {
                total += room.memory.sources[source.id].freeSpaceCount;
            }
        }
        return total;
    })();

    let harvesterCreeps = room.findCreeps('harvester');

    if (harvesterCreeps.length < requiredHarvesters) {
        room.findSpawns()[0].spawnHarvester();
    }


};