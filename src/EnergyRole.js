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

    upgradeController(target) {
        return this.creep.upgradeController(target);
    }

    moveToSource() {
        let source = Game.getObjectById(this.memory.source);
        return this.creep.moveToTarget(source);
    }

    harvestSource() {
        let source = Game.getObjectById(this.memory.source);
        return this.creep.harvest(source);
    }

    buildStructure(target) {
        this.creep.build(target);
    }

    transferEnergyToTarget(target) {
        return this.creep.transfer(target, RESOURCE_ENERGY);
    }

    findClosestEnergyDropOff() {
        return this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (s) => {
                return (s.structureType === STRUCTURE_SPAWN ||
                    s.structureType === STRUCTURE_EXTENSION) &&
                    s.energy < s.energyCapacity
            }})
    }

};