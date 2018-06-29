/**
 * Created by Benjamin Jed Harris on 22/06/2018.
 */

const Harvester = require('Harvester');
const Miner = require('Miner');
const Supplier = require('Supplier');
const Builder = require('Builder');
const Upgrader = require('Upgrader');

module.exports = () => {

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                new Harvester(creep);
                break;
            case 'miner':
                new Miner(creep);
                break;
            case 'supplier':
                new Supplier(creep);
                break;
            case 'builder':
                new Builder(creep);
                break;
            case 'upgrader':
                new Upgrader(creep);
                break;
        }
    }

};