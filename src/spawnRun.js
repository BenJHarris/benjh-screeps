/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = (room) => {


    //miners
    let requiredMiners = (() => {
        let total = 0;

        for (let source of room.findSources()) {
            if (source.getAssignedCreeps('miner').length === 0) {
                total ++;
            }
        }
        return total;
    })();

    console.log(`requiredMiners: ${requiredMiners}`);

    if (requiredMiners > 0) {
        room.findSpawns()[0].spawnMiner();
    }

    //suppliers
    let requiredSuppliers = room.findHarvestContainers().length - room.findCreeps('supplier').length;

    console.log(`requiredSuppliers: ${requiredSuppliers}`);

    if (requiredSuppliers > 0) {
        room.findSpawns()[0].spawnSupplier();
    }

    //upgraders
    let requiredUpgraders = (() => {
        if (room.memory.controllerContainer.id !== null) {
            return 3 - room.findCreeps('upgrader').length;
        } else {
            return 0;
        }
    })();

    console.log(`requiredUpgraders: ${requiredUpgraders}`);

    if (requiredUpgraders > 0) {
        room.findSpawns()[0].spawnUpgrader();
    }


    //builders
    let requiredBuilders = (() => {
        let total = 0;
        let harvesterCount = room.findCreeps('harvester').length;
        let builderCount = room.findCreeps('builder').length;
        if (harvesterCount === 0  &&
            builderCount === 0 &&
            room.getBuildList().length > 0) {
            total += 1;
        }
        return total;
    })();

    console.log(`requiredBuilders: ${requiredBuilders}`);

    if (requiredBuilders > 0) {
        room.findSpawns()[0].spawnBuilder();
    }


    //harvesters
    let requiredHarvesters = (() => {
        let total = 0;

        for (let source of room.findSources()) {
            if (source.getAssignedCreeps('miner').length === 0 &&
            source.getAssignedCreeps('harvester') < room.memory.sources[source.id].freeSpaceCount) {
                total += room.memory.sources[source.id].freeSpaceCount;
            }
        }
        return total;
    })();

    console.log(`requiredHarvesters: ${requiredHarvesters}`);

    if (requiredHarvesters > 0) {
        room.findSpawns()[0].spawnHarvester();
    }


};