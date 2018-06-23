/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const config = require ('config');

module.exports = () => {

    Room.prototype.findSources = function() {
        return this.find(FIND_SOURCES);
    };

    Room.prototype.leastAssignedSource = function() {
        this.findSources().map((source) => {
            console.log(source.getAssignedCreeps());
        });
        return this.findSources().reduce((min, source) => source.getAssignedCreeps() < min.getAssignedCreeps() ? source : min);
    };

    Room.prototype.config = function() {
        return config.getForLevel(this.controller.level);
    }

};