/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const Harvester = require('Harvester');

module.exports = () => {

    StructureSpawn.prototype.spawnHarvester = function() {

        let config = this.room.getConfig().harvester;
        let body = config.body;
        let memory = {
            status: 'mov_to_source',
            role: 'harvester',
            source: (() => this.room.leastAssignedSource().id)()
        };

        this.spawnCustom(body, memory)

    };

    StructureSpawn.prototype.spawnCustom = function(bodyParts, roleMemory) {

        //check to see if creep is spawnable;
        if (!(this.spawnCreep(
            bodyParts,
            `c${Memory.creepCount}`,
            {dryRun: true}
        ) === OK)) {
            // throw new Error(`creep c${Memory.creepCount} could not be created`);
        } else {

            let memory = {
                spawn: this.id,
            };
            for (let prop in roleMemory) {
                memory[prop] = roleMemory[prop];
            }


            this.spawnCreep(
                bodyParts,
                `c${Memory.creepCount++}`,
                {
                    memory: memory
                }
            )
        }
    }
};