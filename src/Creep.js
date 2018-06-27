/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = () => {

    Creep.prototype.goToClosestSpawn = function() {
        let closestSpawn = this.room.spawn[0];

        this.moveTo(closestSpawn);
    };

    Creep.prototype.goToSource = function() {
        let source = Game.getObjectById(this.memory.source);

        this.moveTo(source);
    };

    Creep.prototype.harvestSource = function() {
        let source = Game.getObjectById(this.memory.source);

        return this.harvest(source);
    };

    Creep.prototype.setStatus = function(status) {
        this.memory.status = status;
    };

    Creep.prototype.setTarget = function(target) {
        this.memory.target = target.id;
    };

    Creep.prototype.getTarget = function() {
        return Game.getObjectById(this.memory.target);
    };

    Creep.prototype.moveToTarget = function(target) {
        console.log(target);
        if (!target) {
            throw new Error(`creep ${this.name} requires target`);
        }

        let result = this.moveTo(target);

        if ((target.structureType && target.structureType === STRUCTURE_CONTROLLER) ||
            target instanceof ConstructionSite) {
            if (this.pos.inRangeTo(target.pos, 3)) {
                return 1;
            } else {
                return result;
            }
        } else {
            if (this.pos.inRangeTo(target.pos, 1)) {
                return 1
            } else {
                return result;
            }
        }
    };
};