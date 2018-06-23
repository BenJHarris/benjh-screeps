require ('prototypes')();

const manageMemory = require ('manageMemory');
const rolerun = require ('rolerun') ;
const spawnRun = require ('spawnRun');

module.exports.loop = () => {

    manageMemory();


    for (let name in Game.rooms) {

        rolerun();
        spawnRun();

        let room = Game.rooms[name];
        if (!room.controller.safeMode) {
            room.controller.activateSafeMode();
        }

    }

};