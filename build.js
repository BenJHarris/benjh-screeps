/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = {

    extension: (room) => {

        if (!room.structureCount(STRUCTURE_EXTENSION) < CONTROLLER_STRUCTURES['extension'][room.getLevel()]) {
            return -1;
        }


        let firstSpawn = room.findSpawns()[0];
        let startX = firstSpawn.pos.x - 1;
        let startY = firstSpawn.pos.y - 1;

        let positionFound = false;

        let length = 2;
        let x = 0;
        let y = 0;
        while(!positionFound) {

            for (; x < length; x += 2) {
                if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) == OK) {
                    positionFound = true;
                }
            }

            if (!positionFound) {
                for (; y < length; y += 2) {
                    if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) == OK) {
                        positionFound = true;
                    }
                }
            }

            if (!positionFound) {
                for (; x > 0; x -= 2) {
                    if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) == OK) {
                        positionFound = true;
                    }
                }
            }

            if (!positionFound) {
                for (; y > 0; y -= 2) {
                    if (room.createConstructionSite(startX + x, startY + y, STRUCTURE_EXTENSION) == OK) {
                        positionFound = true;
                    }
                }
            }

            startX -= 1;
            startY -= 1;
            length += 2;
        }
    }
};

