/**
 * Created by Benjamin Jed Harris on 24/06/2018.
 */

module.exports =
    class Role {

        constructor(creep) {
            this.creep = creep;
            this.memory = creep.memory;
            this.run();
        }

        setStatus(status) {
            return this.creep.setStatus(status)
        }

        moveToController() {
            let controller = this.creep.room.controller;
            return this.creep.moveToController(controller);
        }

        upgradeController() {
            let controller = this.creep.room.controller;
            return this.creep.upgradeController(controller);
        }

        isFull() {
            return this.creep.carry[RESOURCE_ENERGY] === this.creep.carryCapacity;
        }

        isEmpty() {
            return this.creep.carry[RESOURCE_ENERGY] === 0;
        }

        run() {
            throw new Error('run() must be implemented on subclass');
        }

    };