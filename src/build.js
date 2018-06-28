/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = {

    extensions: (room) => {

        let totalBuildableNumber = CONTROLLER_STRUCTURES['extension'][room.getLevel()]
        let numberOfExtensions = room.structureCount(STRUCTURE_EXTENSION);

        let numToBuild = totalBuildableNumber - numberOfExtensions;

        let firstSpawn = room.findSpawns()[0];
        let startX = firstSpawn.pos.x - 1;
        let startY = firstSpawn.pos.y - 1;

        let length = 2;
        let x = 0;
        let y = 0;
        while(numToBuild > 0) {

            for (; x < length; x += 2) {
                if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) === OK) {
                    numToBuild--;
                }
            }
            if (numToBuild > 0) {
                for (; y < length; y += 2) {
                    if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) === OK) {
                        numToBuild--;
                    }
                }
            }
            if (numToBuild > 0) {
                for (; x > 0; x -= 2) {
                    if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) === OK) {
                        numToBuild--;
                    }
                }
            }
            if (numToBuild > 0) {
                for (; y > 0; y -= 2) {
                    if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) === OK) {
                        numToBuild--;
                    }
                }
            }
            startX -= 1;
            startY -= 1;
            length += 2;
        }
    },

    roads: (room) => {

        let origin = room.findSpawns()[0].pos;

        let targets = _.map(room.find(FIND_SOURCES), (source) => {
            return {
                pos: source.pos,
                range: 1
            }
        });
        targets.push({
            pos: room.controller.pos,
            range: 1
        });

        for (obj of targets) {

            let ret = PathFinder.search(
                origin, obj,
                {
                    swampCost: 1,

                    roomCallback: function(roomName) {
                        let room = Game.rooms[roomName];

                        if (!room) return;
                        let costs = new PathFinder.CostMatrix;

                        room.find(FIND_STRUCTURES).forEach((s) => {
                            if (s.structureType === STRUCTURE_ROAD) {
                                costs.set(s.pos.x, s.pos.y, 1);
                            } else if (s.structureType !== STRUCTURE_CONTAINER &&
                                (s.structureType !== STRUCTURE_RAMPART ||
                                !s.my)) {
                                costs.set(s.pos.x, s.pos.y, 0xff);
                            }
                        });

                        return costs;
                    }
                }
            );

            for (pos of ret.path) {
                room.createConstructionSite(pos, STRUCTURE_ROAD);
            }

            room.memory.roadsPlaced = true;

        }

    }
};

