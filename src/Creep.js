/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = () => {

    Creep.prototype.setStatus = function(status) {
        this.memory.status = status;
    };

    Creep.prototype.setTarget = function(target) {
        this.memory.target = target.id;
    };

    Creep.prototype.getTarget = function() {
        return Game.getObjectById(this.memory.target);
    };

};