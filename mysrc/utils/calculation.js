import geometry from './geometry';

const calculation = {

    radToDeg: (rad) => {
        return rad * 180 / Math.PI;
    },
    
    degToRad: (deg) => {
        return Math.PI * deg / 180;
    },
    
    trimDeg: (deg) => {
        let d = deg % 360;
        if (d < 0) {
            d = d + 360;
        }
        return d;
    },

    distance: (position1, position2) => {
        return Math.sqrt(Math.pow(position1.x - position2.x, 2) + Math.pow(position1.y - position2.y, 2))
    },

    calcNewPosition: (position, direction, dist) => {
        const deg = calculation.trimDeg(direction);
        const offset_x = dist * Math.cos(calculation.degToRad(deg));
        const offset_y = dist * Math.sin(calculation.degToRad(deg));

        return geometry.p(position.x + offset_x, position.y - offset_y);
    },
    
    targetDirection: (selfPos, targetPos) => {
        if (selfPos && targetPos) {
            const deg = Math.abs(calculation.radToDeg(Math.atan((targetPos.y - selfPos.y) / (targetPos.x - selfPos.x))));

            if (targetPos.y -  selfPos.y >= 0 && targetPos.x - selfPos.x >= 0) {
                return calculation.trimDeg(360 - deg);
            } else if (targetPos.y - selfPos.y >= 0 && targetPos.x - selfPos.x < 0) {
                return calculation.trimDeg(180 + deg);
            } else if (targetPos.y - selfPos.y < 0 && targetPos.x - selfPos.x < 0) {
                return calculation.trimDeg(180 - deg);
            } else {
                return calculation.trimDeg(deg);
            }

        } else {
            return null;
        }
    },
};

export default calculation;
