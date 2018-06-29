/**
 * Created by Benjamin Jed Harris on 23/06/2018.
 */

module.exports = {

    createBody: (bodySingle, bodyRepeat, energy, bodyPriority) => {
        if (!bodyPriority) {
            bodyPriority = [WORK, CARRY, MOVE]
        }

        const calcBodyCost = body => _.sum(body.map(p => BODYPART_COST[p]));

        let bodySingleCost = calcBodyCost(bodySingle);
        let bodyRepeatCost = calcBodyCost(bodyRepeat);

        let availableEnergy = energy - bodySingleCost;
        let repeatTimes = Math.floor(availableEnergy/bodyRepeatCost);
        if (repeatTimes === 0) {
            repeatTimes = 1;
        }

        let bodyParts = [];
        bodySingle.forEach((p) => bodyParts.push(p));
        for (let i = 0; i < repeatTimes; i++) {
            bodyRepeat.forEach((p) => bodyParts.push(p));
        }

        return bodyParts.sort((a, b) => bodyPriority.indexOf(a) - bodyPriority.indexOf(b))
    }

};