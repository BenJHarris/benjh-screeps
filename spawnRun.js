/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = () => {
    for (let name in Game.spawns) {
        let spawn = Game.spawns[name];

        spawn.spawnHarvester();
    }
};