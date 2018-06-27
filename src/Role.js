/**
 * Created by Benjamin Jed Harris on 24/06/2018.
 */

module.exports =
    /**
     * abstract class for all creep roles
     */
    class Role {

        constructor(creep) {
            this.creep = creep;
            this.memory = creep.memory;
        }

        setStatus(status) {
            return this.creep.setStatus(status)
        }

        moveToTarget(target) {
            return this.creep.moveToTarget(target);
        }

        run() {
            throw new Error('run() must be implemented on subclass');
        }

    };