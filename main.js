require ('prototypes')();

const manageMemory = require ('manageMemory');
const roleRun = require ('roleRun') ;
const spawnRun = require ('spawnRun');
const buildRun = require ('buildRun');

module.exports.loop = () => {

    manageMemory();
    for (let name in Game.rooms) {
        let room = Game.rooms[name];

        roleRun();
        spawnRun();
        buildRun(room);

        build.extension(room);

        if (!room.controller.safeMode) {
            room.controller.activateSafeMode();
        }

    }

};