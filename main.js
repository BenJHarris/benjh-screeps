require('Creep')();
require('Spawn')();
require('Room')();
require('RoomPosition')();

const rolerun = require ('rolerun') ;
const manageMemory = require ('manageMemory');
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