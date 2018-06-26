/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const config = require ('config');
const constants = require('constants');

module.exports = () => {

    Room.prototype.findSources = function() {
        return this.find(FIND_SOURCES);
    };

    Room.prototype.findSpawns = function() {
        return this.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_SPAWN});
    };

    Room.prototype.leastAssignedSource = function() {
        return this.findSources().reduce((min, source) =>
            source.getAssignedCreeps().length < min.getAssignedCreeps().length ? source : min);
    };

    Room.prototype.getLevel = function() {
        return this.controller.level;
    };

    Room.prototype.getConfig = function() {
        return config.getForLevel(this.getLevel());
    };

    Room.prototype.structureCount = function(type, includeConstruction=true) {
        let total = 0;
        total += this.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === type}).length;
        if (includeConstruction) {
            total += this.find(FIND_MY_CONSTRUCTION_SITES, {filter: (s) => s.structureType === type}).length
        }
        return total;
    };

    Room.prototype.getBuildList = function() {
        let constructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
        let buildPriority = this.getConfig().buildPriority;

        return constructionSites.sort((a, b) => buildPriority.indexOf(a) - buildPriority.indexOf(b));
    };

    Room.prototype.getMode = function() {
        if (this.controller.ticksToDowngrade < 1000) {
            return constants.ROOM_MODE_CONTROLLER
        } else {
            return constants.ROOM_MODE_NORMAL;
        }
    }
};