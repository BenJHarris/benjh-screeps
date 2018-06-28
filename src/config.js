/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = {

    getForLevel: function(level) {

        switch(level) {
            case(1):
                return rcl1;
            case(2):
                return rcl2;
            case(3):
                return rcl3;
        }
    }
};

rcl1 = {
    harvester: {
        body: [WORK, CARRY, MOVE, MOVE]
    }
};

rcl2 =  {
    harvester: rcl1.harvester,
    miner: {
        body: [WORK, WORK, WORK, WORK, WORK, MOVE]
    },
    buildPriority: [STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_RAMPART, STRUCTURE_WALL]
};

rcl3 = {
    harvester: rcl1.harvester,
    miner: {
        body: [WORK, WORK, WORK, WORK, WORK, MOVE, CARRY]
    },
    buildPriority: [STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_CONTAINER, STRUCTURE_TOWER,
        STRUCTURE_RAMPART, STRUCTURE_WALL]
};