/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

module.exports = () => {

    Room.prototype.findSources = function() {
        return this.find(FIND_SOURCES);
    }

};