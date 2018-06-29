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
        };

        this.spawnCustom(body, memory)

    };

    StructureSpawn.prototype.spawnMiner = function() {

        let config = this.room.getConfig().miner;
        let body = config.body;
        let memory = {
            role: 'miner',
        };

        this.spawnCustom(body, memory);
    };

    StructureSpawn.prototype.spawnSupplier = function() {

        let config = this.room.getConfig().supplier;
        let body = config.body;
        let memory = {
            role: 'supplier'
        };

        this.spawnCustom(body, memory);
    };

    StructureSpawn.prototype.spawnBuilder = function() {

        let config = this.room.getConfig().builder;
        let body = config.body;
        let memory = {
            role: 'builder'
        };

        this.spawnCustom(body, memory);
    };

    StructureSpawn.prototype.spawnUpgrader = function() {

        let config = this.room.getConfig().upgrader
        let body = config.body;
        let memory = {
            role: 'upgrader'
        };

        this.spawnCustom(body, memory);
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