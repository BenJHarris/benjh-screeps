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
            if (!this.memory) {
                this.memory = {}
            }
            if (!this.memory.status) {
                this.memory.status = 'mov_to_source';
            }
            if (!this.memory.source) {
                this.memory.source = this.creep.room.leastAssignedSource().id
            }
            this.run();
        }

        run() {

            let state = this.memory.status;

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
