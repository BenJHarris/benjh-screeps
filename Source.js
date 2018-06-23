/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = () => {

    Source.prototype.getAssignedCreeps = function() {
        let creepArr = [];

        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory['source'] === this.id) {
                creepArr.push(creep);
            }
        }

        return creepArr;
    }

};