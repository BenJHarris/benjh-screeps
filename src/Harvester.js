/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

const EnergyRole = require('EnergyRole');
const constants = require('constants');

module.exports =
    /**
     * concrete class for harvester creeps
     */
    class Harvester extends EnergyRole {

        static get MOVE_TO_SOURCE() {return 0}
        static get HARVESTING() {return 1}
        static get MOVE_TO_TARGET() {return 2}
        static get TRANSFER_ENERGY() {return 3}
        static get UPGRADE_CONTROLLER() {return 4}

        constructor(creep) {
            super(creep);
        }

        moveToSpawn() {
            let spawn = Game.getObjectById(this.memory.source);
            return this.creep.moveToTarget(spawn);
        }

        transferEnergyToSpawn() {
            let spawn = Game.getObjectById(this.memory.source);
            return this.creep.transfer(spawn, RESOURCE_ENERGY);
        }

        chooseTarget() {
            if (this.creep.room.getMode() === constants.ROOM_MODE_NORMAL) {

            }
        }

        run() {

            const state = this.memory.status;

            // if (state === Harvester.MOVE_TO_SOURCE) {
            //     if (this.moveToSource() > 0) {
            //         this.harvestSource();
            //         this.setStatus(Harvester.HARVESTING);
            //     }
            // } else if (state === Harvester.HARVESTING) {
            //     if (this.isFull()) {
            //         this.chooseTarget();
            //     }
            // }

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
