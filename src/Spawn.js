/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = () => {

    StructureSpawn.prototype.spawnHarvester = function() {

        let config = this.room.getConfig().harvester;
        let body = config.body;
        let memory = {
            source: () => this.room.leastAssignedSource()
        };

        this.spawnCustom(body, memory)

    };

    StructureSpawn.spawnCustom = function(bodyParts, roleMemory) {

        //check to see if creep is spawnable;
        if (!(this.spawnCreep(
            bodyParts,
            `c${Memory.creepCount}`,
            {dryRun: true}
        ) === OK)) {
            throw new Error(`creep c${Memory.creepCount} could not be created`);
        } else {

            let memory = {
                home: this.id,
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