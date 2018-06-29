/**
 * Created by Benjamin Jed Harris on 28/06/2018.
 */

const EnergyRole = require('EnergyRole');

module.exports =


    class Upgrader extends EnergyRole {

        static get MOVE_TO_POSITION() {return 0}
        static get UPGRADE_CONTROLLER() {return 1}


        constructor(creep) {
            super(creep);
            let freeSpot = this.creep.room.findAvailableUpgradePositions()[0];
            console.log(freeSpot);
            if (!this.memory.status) {
                this.memory.status = Upgrader.MOVE_TO_POSITION;
            }
            if (!this.memory.upgradePosition) {
                this.memory.upgradePosition = {};
            }
            if (!this.memory.upgradePosition.x) {
                this.memory.upgradePosition.x = freeSpot.x;
            }
            if (!this.memory.upgradePosition.y) {
                this.memory.upgradePosition.y = freeSpot.y;
            }
            if (!this.memory.container) {
                this.memory.container = this.creep.room.memory.controllerContainer.id;
            }
            this.run();
        }

        moveToTarget(target) {
            let result = this.creep.moveTo(target);
            if (target.isEqualTo(this.creep.pos)) {
                return 1;
            } else {
                return result;
            }
        }

        run() {
            let state = this.memory.status;
            let target = new RoomPosition(this.memory.upgradePosition.x, this.memory.upgradePosition.y, this.creep.room.name);
            let container = Game.getObjectById(this.memory.container);

            if (state === Upgrader.MOVE_TO_POSITION) {
                if (this.moveToTarget(target) > 0) {
                    this.setStatus(Upgrader.UPGRADE_CONTROLLER);
                }
            } else if (state === Upgrader.UPGRADE_CONTROLLER) {
                this.withdrawEnergyFromTarget(container);
                this.upgradeController(this.creep.room.controller);
            } else {
                throw new Error(`creep ${this.creep.name} in undefined state`);
            }

        }


    };