/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

const utility = require('utility');

module.exports = {

    init: (room) => {

        const name = room.name;
        const sources = room.findSources();
        const roomMem = Memory.rooms[name];

        if (!roomMem['sources']) roomMem['sources'] = {};

        for (let source of sources) {
            let sourceId = source.id;
            roomMem['sources'][sourceId] = source.pos.countFreeSpace();
        }



        //flag to say that room memory has been initialised
        Memory.rooms[name]['init'] = true


    }


};