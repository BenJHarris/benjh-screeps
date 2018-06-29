/**
 * Created by Benjamin Jed Harris on 28/06/2018.
 */

const EnergyRole = require('EnergyRole');

module.exports =
    class Supplier extends EnergyRole {

    static get MOVE_TO_ENERGY() {return 0};
    static get MOVE_TO_DROPOFF() {return 1}

    constructor(creep) {
        super(creep);
        if (!this.memory.status) {
            this.memory.status = Supplier.MOVE_TO_ENERGY
        }
        if (!this.memory.target) {
            this.memory.target = this.creep.room.findHarvestContainers()[0].id;
        }
        this.run();
    }

    run() {
        let state = this.memory.status;
        let target = Game.getObjectById(this.memory.target);
        let dropOff = this.findClosestEnergyDropOff();
        let upgradeContainer = Game.getObjectById(this.creep.room.memory.controllerContainer.id);

        if (state === Supplier.MOVE_TO_ENERGY) {
            if (this.moveToTarget(target) > 0) {
                this.withdrawEnergyFromTarget(target);
                if (!this.isEmpty()) {
                    this.setStatus(Supplier.MOVE_TO_DROPOFF);
                    this.run();
                }
            }
        } else if (state === Supplier.MOVE_TO_DROPOFF) {
            target = dropOff;
            if (!target) {
                target = upgradeContainer;
            }
            if (target) {
                if (!this.isEmpty()) {
                    if (this.moveToTarget(target) > 0) {
                        this.transferEnergyToTarget(target);
                    }
                } else {
                    this.setTarget(this.creep.room.findHarvestContainers()[0].id);
                    this.setStatus(Supplier.MOVE_TO_ENERGY);
                    this.run();
                }
            }
        } else {
            // throw new Error(`creep ${this.creep.name} in undefined state`);
        }
    }

    };