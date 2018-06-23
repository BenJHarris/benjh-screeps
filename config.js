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
        body: [WORK, CARRY, CARRY, MOVE, MOVE]
    }
};

rcl2 =  {
    harvester: {
        body: [WORK, CARRY, CARRY, MOVE, MOVE]
    }
};

rcl3 = {
    harvester: {
        body: [WORK, CARRY, CARRY, MOVE, MOVE]
    }
};