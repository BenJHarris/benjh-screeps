/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = () => {

    StructureSpawn.prototype.spawnHarvester = function() {

        if (this.spawnCreep([WORK, MOVE, CARRY], `c${Memory.creepCount}`, {dryRun: true, memory: {role: 'harvester', status: 'mov_to_source'}}) == 0) {
            this.spawnCreep([WORK, MOVE, CARRY], `c${Memory.creepCount++}`, {memory: {role: 'harvester', source: '59f1a32c82100e1594f3b118', status: 'mov_to_source', home: this.id}});
        }

    }


};