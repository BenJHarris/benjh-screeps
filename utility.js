/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = {

    getObjectArrayById: function(idArray) {

        objArray = [];

        for (let id of idArray) {
            objArray.push(objArray.push(Game.getObjectById(id)))
        }
        return objArray
    },

    getIdArrayByObjects: function (objArray) {

        let idArray = [];

        for (let obj of objArray ) {
            idArray.push(obj.id);
        }

        return idArray;

    }

};