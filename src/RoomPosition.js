/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = () => {

    /**
     * Counts the free spaces around a room position, not including the position itself
     * @returns {array}
     */
    RoomPosition.prototype.findFreeSpace = function(range=1) {
        let spaceArr = [];

        for (let x = -range; x <= range;  x++) {
            for (let y = -range; y <= range; y++) {
                if (!(x === 0 && y === 0)) {
                    let rp = new RoomPosition(this.x + x, this.y + y, this.roomName);
                    let tileContents = rp.look();
                    for (let obj of tileContents) {

                        switch(obj['type']) {
                            case('creep'):
                                break;
                            case('terrain'):
                                let terrainType = obj['terrain'];
                                if (terrainType !== 'wall') {
                                    spaceArr.push(rp);
                                }
                                break;
                            case('structure'):
                                break;
                        }
                    }
                }
            }
        }
        return spaceArr;
    };

    /**
     *
     * @param range
     * @returns {StructureContainer[]} containers
     */
    RoomPosition.prototype.containersInRange = function(range=1) {
        return this.findInRange(FIND_STRUCTURES, range, {
            filter: (s) => {
                return s.structureType === STRUCTURE_CONTAINER;
            }
        })
    };
};