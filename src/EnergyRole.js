/**
 * Created by Benjamin Jed Harris on 26/06/2018.
 */

const Role = require('Role');

module.exports =
    /**
     * abstract class for creep roles that deal with energy
     * all creeps using this class must have a source ID in memory
     */
    class EnergyRole extends Role {

    constructor(creep) {
        super(creep);
    }

    isFull() {
        return this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity;
    }

    isEmpty() {
        return this.creep.carry[RESOURCE_ENERGY] === 0;
    }

    moveToController() {
        let controller = this.creep.room.controller;
        return this.creep.moveToController(controller);
    }

    upgradeController() {
        let controller = this.creep.room.controller;
        return this.creep.upgradeController(controller);
    }

    moveToSource() {
        let source = Game.getObjectById(this.memory.source);
        return this.creep.moveToTarget(source);
    }

    harvestSource() {
        let source = Game.getObjectById(this.memory.source);
        return this.creep.harvest(source);
    }

};