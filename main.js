require ('prototypes')();

const manageMemory = require ('manageMemory');
const roleRun = require ('roleRun') ;
const spawnRun = require ('spawnRun');
const build = require ('build');

module.exports.loop = () => {

    manageMemory();




    for (let name in Game.rooms) {

        roleRun();
        spawnRun();

        let room = Game.rooms[name];

        build.extension(room);

        // room.find(FIND_MY_CONSTRUCTION_SITES).map((s) => {
        //     s.remove();
        // });

        if (!room.controller.safeMode) {
            room.controller.activateSafeMode();
        }

    }

};