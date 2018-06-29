/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

const utility = require('utility');

module.exports = {

    getForRoom: function(room) {

        const level = room.controller.level;

        const rcl1 = {
            harvester: {
                body: [WORK, CARRY, MOVE, MOVE],
            }
        };

        const rcl2 =  {
            harvester: rcl1.harvester,
            miner: {
                body: [WORK, WORK, WORK, WORK, WORK, MOVE],
            },
            supplier: {
                body: (() => {
                    let bodySingle = [WORK, MOVE];
                    let bodyRepeat = [MOVE, CARRY];
                    let energyMax = (() => {
                        if (room.findCreeps('supplier').length === 0) {
                            return room.energyAvailable;
                        } else {
                            return room.energyCapacityAvailable;
                        }
                    })();
                    return utility.createBody(bodySingle, bodyRepeat, energyMax);
                })()
            },
            builder: {
                body: (() => {
                    let bodySingle = [];
                    let bodyRepeat = [WORK, CARRY, MOVE, MOVE];
                    let energyMax = room.energyCapacityAvailable;

                    return utility.createBody(bodySingle, bodyRepeat, energyMax);
                })()
            },
            upgrader: {
                body: (() => {
                    let bodySingle = [MOVE, CARRY];
                    let bodyRepeat = [WORK];
                    let energyMax = room.energyCapacityAvailable;

                    return utility.createBody(bodySingle, bodyRepeat, energyMax);
                })()
            },
            buildPriority: [STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_RAMPART, STRUCTURE_WALL]
        };

        const rcl3 = {
            harvester: rcl1.harvester,
            miner: {
                body: [WORK, WORK, WORK, WORK, WORK, MOVE, CARRY]
            },
            supplier: rcl2.supplier,
            builder: rcl2.builder,
            upgrader: rcl2.upgrader,
            buildPriority: [STRUCTURE_EXTENSION, STRUCTURE_ROAD, STRUCTURE_CONTAINER, STRUCTURE_TOWER,
                STRUCTURE_RAMPART, STRUCTURE_WALL]
        };

        const rcl4 = rcl3;
        const rcl5 = rcl4;
        const rcl6 = rcl5;
        const rcl7 = rcl6;
        const rcl8 = rcl7;

        switch(level) {
            case(1):
                return rcl1;
            case(2):
                return rcl2;
            case(3):
                return rcl3;
            case(4):
                return rcl4;
            case(5):
                return rcl5;
            case(6):
                return rcl6;
            case(7):
                return rcl7;
            case(8):
                return rcl8;
        }
    }
};

