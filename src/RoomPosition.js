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
                if (!(x === 0 && y === 0)) {
                    let rp = new RoomPosition(this.x + x, this.y + y, this.roomName);
                    let tileContents = rp.look();
                    for (let obj of tileContents) {

                        switch(obj['type']) {
                            case('creep'):
                                break;
                            case('terrain'):
                                let terrainType = obj['terrain'];
                                if (terrainType === 'wall') {
                                    freeSpaceCount--;
                                }
                                break;
                            case('structure'):
                                break;
                        }
                    }
                }
            }
        }
        return freeSpaceCount;
    };

    RoomPosition.prototype.containersInRange = function(range=1) {
        return this.findInRange(FIND_STRUCTURES, range, {
            filter: (s) => {
                return s.structureType === STRUCTURE_CONTAINER;
            }
        })
    };

    RoomPosition.prototype.findClosestContainerLocation = function() {
        
    }
};