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

        static get MOVE_TO_TARGET() {return 0}
        static get HARVESTING() {return 1}
        static get TRANSFER_ENERGY() {return 2}
        static get UPGRADE_CONTROLLER() {return 3}
        static get BUILD_STRUCTURE() {return 4}


        constructor(creep) {
            super(creep);
            if (!this.memory.status) {
                this.memory.status = Harvester.MOVE_TO_TARGET;
            }
            if (!this.memory.source) {
                this.memory.source = this.creep.room.leastAssignedSource('harvester').id
            }
            if (!this.memory.target) {
                this.memory.target = this.memory.source;
            }
            this.run();
        }

        chooseTarget() {

            let roomMode = this.creep.room.getMode();
            let target;

            if (roomMode === constants.ROOM_MODE_NORMAL) {

                target = this.findClosestEnergyDropOff();

                if (!target) {
                    let buildList = this.creep.room.getBuildList();
                    if (buildList.length > 0) {
                        target = buildList[0];
                    } else {
                        target = this.creep.room.controller
                    }
                }
            } else if (roomMode === constants.ROOM_MODE_CONTROLLER) {
                target = this.creep.room.controller;
            } else if (roomMode === constants.ROOM_MODE_FLEE) {

            }
            this.setTarget(target);
        }

        run() {
            let state = this.memory.status;
            let target = Game.getObjectById(this.memory.target);
            // fix in case a construction site gets built while a creep's target
            if (target === null) {
                this.memory.target = this.memory.source;
                target = Game.getObjectById(this.memory.target);
                this.setStatus(Harvester.MOVE_TO_TARGET);
            }

            let source = Game.getObjectById(this.memory.source);
            // check to see if there are any miner creeps assigned to the same source
            if (source.getAssignedCreeps('miner').length > 0) {
                this.creep.suicide();
            }

            if (state === Harvester.MOVE_TO_TARGET
            ) {
                if (this.moveToTarget(target) > 0) {

                    if (target instanceof Source) {
                        this.setStatus(Harvester.HARVESTING);
                        this.run();
                    } else if (target instanceof Structure &&
                        (target.structureType === STRUCTURE_SPAWN ||
                            target.structureType === STRUCTURE_EXTENSION)) {
                        this.setStatus(Harvester.TRANSFER_ENERGY);
                        this.run();
                    } else if (target instanceof StructureController) {
                        this.setStatus(Harvester.UPGRADE_CONTROLLER);
                        this.run();
                    } else if (target instanceof ConstructionSite) {
                        this.setStatus(Harvester.BUILD_STRUCTURE);
                        this.run();
                    }
                }
            } else if (state === Harvester.HARVESTING) {
                if(!this.isFull()) {
                    this.harvestSource();
                } else {
                    this.chooseTarget();
                    this.setStatus(Harvester.MOVE_TO_TARGET);
                    this.run();
                }
            } else if (state === Harvester.TRANSFER_ENERGY) {
                if (!this.isEmpty() && target.energy < target.energyCapacity) {
                    this.transferEnergyToTarget(target);
                } else {
                    this.setTarget(source);
                    this.setStatus(Harvester.MOVE_TO_TARGET);
                    this.run();
                }
            } else if (state === Harvester.UPGRADE_CONTROLLER) {
                if (!this.isEmpty() && this.creep.pos.inRangeTo(target, 3)) {
                    this.upgradeController(target);
                } else {
                    this.setTarget(source);
                    this.setStatus(Harvester.MOVE_TO_TARGET);
                    this.run();
                }
            } else if (state === Harvester.BUILD_STRUCTURE) {
                if (!this.isEmpty() && target instanceof ConstructionSite) {
                    this.buildStructure(target);
                } else {
                    this.setTarget(source);
                    this.setStatus(Harvester.MOVE_TO_TARGET);
                    this.run();
                }
            } else {
                throw new Error(`creep ${this.creep.name} in undefined state`);
            }
        }
    };
