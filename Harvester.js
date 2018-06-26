/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

const EnergyRole = require('EnergyRole');

module.exports =

    class Harvester extends EnergyRole {

        constructor(creep) {
            super(creep);
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

        transferEnergyToSpawn() {
            let spawn = Game.getObjectById(this.memory.source);
            return this.creep.transfer(spawn, RESOURCE_ENERGY);
        }

        run() {

            const state = this.memory.status;

            if (state === 'mov_to_source') {
                if (this.moveToSource() > 0) {
                    this.harvestSource();
                    this.setStatus('harvesting')
                }
            } else if (state === 'harvesting') {
                if (this.isFull()) {
                    this.moveToController();
                    this.setStatus('mov_to_cont');
                } else {
                    this.harvestSource();
                }
            } else if (state === 'mov_to_cont') {
                if (this.moveToController() > 0) {
                    this.upgradeController();
                    this.setStatus('upg_cont')
                }
            } else if (state === 'upg_cont') {
                if (this.isEmpty()) {
                    this.moveToSource();
                    this.setStatus('mov_to_source');
                } else {
                    this.upgradeController();
                }
            }
        }
    };
