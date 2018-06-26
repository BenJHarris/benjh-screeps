/**
 * Created by Benjamin Jed Harris on 26/06/2018.
 */

const Role = require('Role');

module.exports = class EnergyRole extends Role {

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

};