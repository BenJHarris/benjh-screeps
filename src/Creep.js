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

    Creep.prototype.moveToTarget = function(target) {
        let result =  this.moveTo(target);
        if (this.pos.inRangeTo(target.pos, 1)) {
            return 1
        } else {
            return result;
        }
    };

    Creep.prototype.moveToController = function(target) {
        let result =  this.moveTo(target);
        if (this.pos.inRangeTo(target.pos, 3)) {
            return 1
        } else {
            return result;
        }
    }



};