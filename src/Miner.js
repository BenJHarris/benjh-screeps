/**
 * Created by Benjamin Jed Harris on 26/06/2018.
 */

const EnergyRole = require('EnergyRole');

module.exports =
    /**
     * Concrete class for miner creeps
     */
    class Miner extends EnergyRole {

        static get MOVE_TO_TARGET() {return 0}
        static get HARVESTING() {return 1}
        static get TRANSFER_ENERGY() {return 2}
        static get BUILD_STRUCTURE() {return 3}

    constructor(creep) {
        super(creep);
        if (!this.memory.status) {
            this.memory.status = Miner.MOVE_TO_TARGET;
        }
        if (!this.memory.source) {
            this.memory.source = this.creep.room.leastAssignedSource().id
        }
        if (!this.memory.target) {
            this.memory.target = this.memory.source;
        }
        if (!this.memory.harvestPosition) {
            this.memory.harvestPosition = {};
        }
        if (!this.memory.harvestPosition) {
            this.memory.harvestPosition.x = 0;
        }
        if (!this.memory.harvestPosition) {
            this.memory.harvestPosition.y = 0;
        }
        this.run();
    }

    run() {



    }

};