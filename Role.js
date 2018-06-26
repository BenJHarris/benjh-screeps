/**
 * Created by Benjamin Jed Harris on 24/06/2018.
 */

module.exports =
    class Role {

        constructor(creep) {
            this.creep = creep;
            this.memory = creep.memory;
            this.run();
        }

        setStatus(status) {
            return this.creep.setStatus(status)
        }

        run() {
            throw new Error('run() must be implemented on subclass');
        }

    };