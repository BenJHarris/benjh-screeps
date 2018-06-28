require ('prototypes')();

const manageMemory = require ('manageMemory');
const roleRun = require ('roleRun') ;
const spawnRun = require ('spawnRun');
const buildRun = require ('buildRun');

module.exports.loop = () => {

    manageMemory();
    roleRun();

    for (let name in Game.rooms) {
        let room = Game.rooms[name];

        spawnRun(room);
        buildRun(room);

        if (room.controller.my || room.find(FIND_HOSTILE_CREEPS).length > 0) {
            room.controller.activateSafeMode();
        }

    }

};