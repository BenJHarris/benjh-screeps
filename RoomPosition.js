/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = () => {

    /**
     * Counts the free spaces around a room position, not including the position itself
     * @returns {number}
     */
    RoomPosition.prototype.countFreeSpace = function() {

        let freeSpaceCount = 8;

        for (let x = -1; x <= 1;  x++) {
            for (let y = -1; y <= 1; y++) {
                if (x !== 0 && y !== 0 ) {
                    let rp = new RoomPosition(this.x + x, this.y + y, this.roomName);

                    for (let obs of OBSTACLE_OBJECT_TYPES) {
                        if (rp.lookFor(obs).length > 0 ) {
                            freeSpaceCount--;
                            break;
                        }
                    }
                }
            }
        }

        return freeSpaceCount;

    }


};