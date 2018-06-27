/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const creepMemory = require('creepMemory');
const roomMemory = require('roomMemory');

module.exports = () => {

    creepMemory.init();
    creepMemory.run();

    for (let name in Game.rooms) {
        let room = Game.rooms[name];
        if (!room.memory['init']) {
            roomMemory.init(room);
        }
    }

};