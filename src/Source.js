/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = () => {

    Source.prototype.getAssignedCreeps = function(type=undefined) {
        let creepArr = [];

        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.source && creep.memory.source === this.id) {
                creepArr.push(creep);
            }
        }
        if (type === undefined) {
            return creepArr;
        } else {
            return _.filter(creepArr, (c) => {
                return c.memory.role && c.memory.role === type
            })
        }
    }





};