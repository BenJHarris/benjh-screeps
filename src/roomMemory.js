/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

const utility = require('utility');

module.exports = {

    init: (room) => {

        const name = room.name;
        const sources = room.findSources();
        const memory = Memory.rooms[name];

        if (!memory.sources) {
            memory.sources = {};
        }

        for (let source of sources) {
            let sourceId = source.id;
            memory.sources[sourceId] = source.pos.countFreeSpace();
        }

        if (!'roadsPlaced' in memory) {
            memory.roadsPlaced = false;
        }
        //flag to say that room memory has been initialised
        Memory.rooms[name]['init'] = true
    }


};