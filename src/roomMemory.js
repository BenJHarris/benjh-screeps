/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = {

    init: (room) => {

        const name = room.name;
        const sources = room.findSources();
        const memory = Memory.rooms[name];

        if (!memory.sources) {
            memory.sources = {};
        }

        for (let source of sources) {
            let sourceId = source.id;

            if (!memory.sources[sourceId]) {
                memory.sources[sourceId] = {};

                let sourceMem = memory.sources[sourceId];

                if (!sourceMem.freeSpaceCount) {
                    sourceMem.freeSpaceCount = source.pos.findFreeSpace().length;
                }

                if(!('containerPlaced' in sourceMem)) {
                    sourceMem.containerPlaced = false;
                }

                if (!sourceMem.containerLocation) {
                    sourceMem.containerLocation = {};
                }

                let scMem = sourceMem.containerLocation;
                let sourceContainer = source.pos.containersInRange()[0];

                if (!scMem.x) {
                    scMem.x = sourceContainer ? sourceContainer.pos.x : null;
                }

                if (!scMem.y) {
                    scMem.y = sourceContainer ? sourceContainer.pos.y : null;
                }

                if (!('containerId' in sourceMem)) {
                    sourceMem.containerId = null;
                }
            }
        }

        if (!('roadsPlaced' in memory)) {
            memory.roadsPlaced = false;
        }

        if (!memory.controllerContainer) {
            memory.controllerContainer = {};
        }

        if (!memory.controllerContainer.x) {
            memory.controllerContainer.x = null;
        }

        if (!memory.controllerContainer.y) {
            memory.controllerContainer.y = null;
        }

        if (!memory.controllerContainer.id) {
            memory.controllerContainer.id = null;
        }

        if (!memory.controllerContainer.containerPlaced) {
            memory.controllerContainer.containerPlaced = false;
        }

        //flag to say that room memory has been initialised
        Memory.rooms[name].init = true
    },

    run: (room) => {

        //check to see whether harvestContainers have been built
        for (let sourceId in room.memory.sources) {
            let sourceMem = room.memory.sources[sourceId];
            let x = sourceMem.containerLocation.x;
            let y = sourceMem.containerLocation.y;
            if (sourceMem.containerId === null &&
                x !== null &&
                y !== null) {
                let containers = _.filter(room.lookForAt(LOOK_STRUCTURES, x, y,), (s) => {
                    return s.structureType === STRUCTURE_CONTAINER
                });
                if (containers.length > 0) {
                    sourceMem.containerId = containers[0].id;
                }
            }
        }

        //check to see whether upgradeContainer has been built
        let ccMem = room.memory.controllerContainer;
        if (ccMem.containerPlaced) {
            let x = ccMem.x;
            let y = ccMem.y;
            if (ccMem.id === null &&
            x!== null &&
            y!== null) {
                let containers = _.filter(room.lookForAt(LOOK_STRUCTURES, x, y,), (s) => {
                    return s.structureType === STRUCTURE_CONTAINER
                });
                if (containers.length > 0) {
                    ccMem.id = containers[0].id;
                }
            }
        }

    }


};