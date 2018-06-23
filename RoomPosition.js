/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = () => {

    /**
     * Counts the free spaces around a room position, not including the position itself
     * @returns {number}
     */
    RoomPosition.prototype.countFreeSpace = function() {

        let freeSpaceCount = 0;

        for (let x = -1; x <= 1;  x++) {
            for (let y = -1; y <= 1; y++) {
                if (x !== 0 && y !== 0 ) {
                    let rp = new RoomPosition(this.x + x, this.y + y, this.roomName);
                    let surroundings = rp.look();

                    if (surroundings.length > 0) {
                        for (let object in surroundings) {
                            if (!OBSTACLE_OBJECT_TYPES.indexOf(object.type) >= 0) {
                                freeSpaceCount++
                            }
                        }
                    }
                }
            }
        }

        return freeSpaceCount;

    }


};