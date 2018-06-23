/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

const utility = require('utility');

module.exports = {

    init: (room) => {

        const name = room.name;
        const sources = room.findSources();

        Memory.rooms[name] = {
            init: true,
            sources: utility.getIdArrayByObjects(sources),
            harvestSpots: sources.map(s => s.pos.countFreeSpace()).reduce((total, sc) => total + sc)
        }

    }


};