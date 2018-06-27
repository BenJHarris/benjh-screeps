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
            if (!this.memory) {
                this.memory = {};
            }
            if (!this.memory.spawn) {
                this.memory.spawn = this.creep.room.findSpawns()[0].id;
            }
        }

        setStatus(status) {
            return this.creep.setStatus(status)
        }

        setTarget(target) {
            return this.creep.setTarget(target);
        }

        getTarget() {
            return this.creep.getTarget();
        }

        moveToTarget(target) {
            return this.creep.moveToTarget(target);
        }

        run() {
            throw new Error('run() must be implemented on subclass');
        }

    };