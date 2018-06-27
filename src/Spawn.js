/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const Harvester = require('Harvester');

module.exports = () => {

    StructureSpawn.prototype.spawnHarvester = function() {

        let config = this.room.getConfig().harvester;
        let body = config.body;
        let memory = {
            role: 'harvester',
            status: Harvester.MOVE_TO_TARGET,
            source: (() => this.room.leastAssignedSource().id)()
        };

        console.log(body);
        console.log(memory);

        this.spawnCustom(body, memory)

    };

    StructureSpawn.prototype.spawnMiner = function() {

        let config = this.room.getConfig().miner;
    };

    StructureSpawn.prototype.spawnCustom = function(bodyParts, roleMemory) {

        //check to see if creep is spawnable;
        if (!(this.spawnCreep(
            bodyParts,
            `c${Memory.creepCount}`,
            {dryRun: true}
        ) === OK)) {
            //throw new Error(`creep c${Memory.creepCount} could not be created`);
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