/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = () => {

    StructureSpawn.prototype.spawnHarvester = function() {

        if (this.spawnCreep(this.room.getConfig().harvester.body, `c${Memory.creepCount}`, {dryRun: true}) == 0) {
            this.spawnCreep(this.room.getConfig().harvester.body, `c${Memory.creepCount++}`, {
                memory: {
                    role: 'harvester',
                    source: (() => this.room.leastAssignedSource().id)(),
                    status: 'mov_to_source',
                    home: this.id
                }
            });
        }
    }
};