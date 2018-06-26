/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const config = require ('config');

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

    Room.prototype.structureCount = function(type, includeConstruction=false) {
        let total = this.find(FIND_MY_STRUCTURES, {filter: (s) => s.structureType === type});
        if (includeConstruction) {
            total += this.find(FIND_MY_CONSTRUCTION_SITES, {filter: (s) => s.structureType === type})
        }
        return total;
    };

    Room.prototype.getBuildList = function() {
        let constructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
        let buildPriority = this.getConfig().buildPriority;

        return constructionSites.sort((a, b) => buildPriority.indexOf(a) - buildPriority.indexOf(b));
    }

};