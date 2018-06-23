/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports =

    class Harvester {

        constructor(creep) {
            this.creep = creep;
            this.memory = creep.memory;
        }

        moveToSource() {
            let source = Game.getObjectById(this.memory.source);
            return this.creep.moveToTarget(source);
        }

        harvestSource() {
            let source = Game.getObjectById(this.memory.source);
            return this.creep.harvest(source);
        }

        moveToSpawn() {
            let spawn = Game.getObjectById(this.memory.source);
            return this.creep.moveToTarget(spawn);
        }

        transferEnergy() {
            let spawn = Game.getObjectById(this.memory.source);
            return this.creep.transfer(spawn);
        }

        moveToController() {
            let controller = this.creep.room.controller;
            return this.creep.moveToTarget(controller);
        }

        upgradeController() {
            let controller = this.creep.room.controller;
            return this.creep.upgradeController(controller);
        }

        run() {

            switch (this.memory.status) {
                case ('mov_to_source'):
                    this.moveToSource();
                    break;

                case ('harvesting'):
                    if (this.creep.carry[RESOURCE_ENERGY] == this.creep.carryCapacity) {
                        this.creep.setStatus('mov_to_cont');
                    } else {
                        this.creep.harvestSource();
                    }
                    break;

                case ('mov_to_cont'):
                    if (this.creep.upgradeController(this.creep.room.controller) === ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(this.creep.room.controller);
                    } else if(this.creep.carry[RESOURCE_ENERGY] == 0) {
                        this.creep.setStatus('mov_to_source');
                    }
                    break;
            }

        }
    };
