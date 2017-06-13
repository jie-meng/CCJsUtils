import { expect } from 'chai';
import geometry from './geometry';
import calculation from './calculation';

describe('calculation', () => {
    
    describe('trimDeg', () => {
        it('should return 0 when value is 0', () => {
            expect(calculation.trimDeg(0)).to.equal(0);
        });
    
        it('should return -45 when value is 315', () => {
            expect(calculation.trimDeg(-45)).to.equal(315);
        });

        it('should return 359 when value is 359', () => {
            expect(calculation.trimDeg(359)).to.equal(359);
        });

        it('should return 0 when value is 360', () => {
            expect(calculation.trimDeg(360)).to.equal(0);
        });

        it('should return 90 when value is 450', () => {
            expect(calculation.trimDeg(450)).to.equal(90);
        });
    });

    describe('calcNewPosition', () => {
        it('should return geometry.p(220, 200) when position is geometry.p(200, 200), direction is 0 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 0, 20);

            expect(p.x).to.equal(220);
            expect(p.y).to.equal(200);
        });
        
        it('should return geometry.p(214, 185) when position is geometry.p(200, 200), direction is 45 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 45, 20);

            expect(Math.floor(p.x)).to.equal(214);
            expect(Math.floor(p.y)).to.equal(185);
        });
        
        it('should return geometry.p(200, 180) when position is geometry.p(200, 200), direction is 90 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 90, 20);

            expect(Math.floor(p.x)).to.equal(200);
            expect(Math.floor(p.y)).to.equal(180);
        });
        
        it('should return geometry.p(185, 185) when position is geometry.p(200, 200), direction is 135 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 135, 20);

            expect(Math.floor(p.x)).to.equal(185);
            expect(Math.floor(p.y)).to.equal(185);
        });
        
        it('should return geometry.p(180, 200) when position is geometry.p(200, 200), direction is 180 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 180, 20);

            expect(Math.floor(p.x)).to.equal(180);
            expect(Math.floor(p.y)).to.equal(200);
        });
        
        it('should return geometry.p(185, 214) when position is geometry.p(200, 200), direction is 225 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 225, 20);

            expect(Math.floor(p.x)).to.equal(185);
            expect(Math.floor(p.y)).to.equal(214);
        });
        
        it('should return geometry.p(200, 220) when position is geometry.p(200, 200), direction is 270 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 270, 20);

            expect(Math.floor(p.x)).to.equal(200);
            expect(Math.floor(p.y)).to.equal(220);
        });
        
        it('should return geometry.p(214, 214) when position is geometry.p(200, 200), direction is 315 and dist is 20', () => {
            const p = calculation.calcNewPosition(geometry.p(200, 200), 315, 20);

            expect(Math.floor(p.x)).to.equal(214);
            expect(Math.floor(p.y)).to.equal(214);
        });
    });
    
    describe('distance', () => {
        it('should return 100 when given (100, 100), (200, 100)', () => {
            expect(calculation.distance(geometry.p(100, 100), geometry.p(200, 100))).to.equal(100);
        });
        
        it('should return 100 when given (100, 100), (100, 200)', () => {
            expect(calculation.distance(geometry.p(100, 100), geometry.p(100, 200))).to.equal(100);
        });
        
        it('should return 100 when given (100, 100), (200, 200)', () => {
            expect(Math.floor(calculation.distance(geometry.p(100, 100), geometry.p(200, 200)))).to.equal(141);
        });
    });
    
    describe('targetDirection', () => {
        
        describe('with invalid argument', () => {
            it('should return null when selfPos not given', () => {
                expect(calculation.targetDirection(undefined, geometry.p(100, 100))).to.be.null;
            });
            
            it('should return null when targetPos not given', () => {
                expect(calculation.targetDirection(geometry.p(100, 100))).to.be.null;
            });
        });

        describe('with selfPos (100, 100)', () => {
            const selfPos = geometry.p(100, 100);

            it('should return 0 when targetPos is (200, 100)', () => {
               expect(calculation.targetDirection(selfPos, geometry.p(200, 100))).to.equal(0);
            });

            it('should return 45 when targetPos is (200, 0)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(200, 0))).to.equal(45);
            });

            it('should return 90 when targetPos is (100, 0)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(100, 0))).to.equal(90);
            });

            it('should return 135 when targetPos is (0, 0)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(0, 0))).to.equal(135);
            });

            it('should return 180 when targetPos is (0, 100)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(0, 100))).to.equal(180);
            });

            it('should return 225 when targetPos is (0, 200)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(0, 200))).to.equal(225);
            });

            it('should return 270 when targetPos is (100, 200)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(100, 200))).to.equal(270);
            });

            it('should return 315 when targetPos is (200, 200)', () => {
                expect(calculation.targetDirection(selfPos, geometry.p(200, 200))).to.equal(315);
            });
        });
    });
});
