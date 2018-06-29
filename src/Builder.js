/**
 * Created by Benjamin Jed Harris on 29/06/2018.
 */

const EnergyRole = require('EnergyRole');

module.exports =
    class Builder extends EnergyRole {

        static get MOVE_TO_ENERGY() {return 0}
        static get MOVE_TO_BUILD() {return 1}
        static get BUILD_TARGET() {return 2}

        constructor(creep) {
            super(creep);
            if (!this.memory.status) {
                this.memory.status = Builder.MOVE_TO_ENERGY;
            }
            if (!this.memory.target) {
                this.memory.target = this.creep.room.findHarvestContainers()[0].id;
            }
            this.run()
        }

        run() {
            let state = this.memory.status;
            let target = Game.getObjectById(this.memory.target);
            let buildList = this.creep.room.getBuildList();

            if (buildList.length === 0) {
                this.memory = {};
                this.memory.role = 'supplier';
            }

            if (state === Builder.MOVE_TO_ENERGY) {
                if (this.moveToTarget(target) > 0) {
                    this.withdrawEnergyFromTarget(target);
                    if (this.isFull()) {
                        this.setTarget(buildList[0]);
                        this.setStatus(Builder.MOVE_TO_BUILD);
                        this.run();
                    }
                }
            } else if (state === Builder.MOVE_TO_BUILD) {
                if (this.moveToTarget(target) > 0) {
                    this.setStatus(Builder.BUILD_TARGET);
                    this.run();
                }
            } else if (state === Builder.BUILD_TARGET) {
                if (!this.isEmpty()) {
                    this.buildStructure(target)
                } else {
                    this.setTarget(this.creep.room.findHarvestContainers()[0].id);
                    this.setStatus(Builder.MOVE_TO_ENERGY);
                }
            }
        }
    };