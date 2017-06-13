const calculation = {
    
    trimDeg: (deg) => {
        let d = deg % 360;
        if (d < 0) {
            d = d + 360;
        }
        return d;
    },
};

export default calculation;