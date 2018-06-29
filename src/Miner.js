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

    constructor(creep) {
        super(creep);
        if (!this.memory.status) {
            this.memory.status = Miner.MOVE_TO_TARGET;
        }
        if (!this.memory.source) {
            this.memory.source = this.creep.room.leastAssignedSource('miner').id
        }
        if (!this.memory.harvestPosition) {
            this.memory.harvestPosition = {};
        }
        let containerPos = this.creep.room.memory.sources[this.memory.source].containerLocation;
        if (!this.memory.harvestPosition.x) {
            this.memory.harvestPosition.x = containerPos.x;
        }
        if (!this.memory.harvestPosition.y) {
            this.memory.harvestPosition.y = containerPos.y;
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
            let source = Game.getObjectById(this.memory.source);
            let target = new RoomPosition(this.memory.harvestPosition.x, this.memory.harvestPosition.y,
                this.creep.room.name);

            if (state === Miner.MOVE_TO_TARGET) {
                if (this.moveToTarget(target) > 0) {
                    this.setStatus(Miner.HARVESTING);
                    this.run();
                }
            } else if (state === Miner.HARVESTING) {
                let siteContainer = this.creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3, {
                    filter: (s) => {
                        return s.structureType === STRUCTURE_CONTAINER;
                    }
                });
                if (siteContainer.length > 0) {
                    this.buildStructure(siteContainer[0]);
                }

                let repairList = this.creep.pos.findInRange(FIND_STRUCTURES, 3, {
                    filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.hits < s.hitsMax
                });

                if (repairList.length > 0) {
                    this.creep.repair(repairList[0]);
                }

                this.harvestSource(source);
            } else {
                throw new Error(`creep ${this.creep.name} in undefined state`);
            }

    }

};