import { expect } from 'chai';
import calculation from './calculation';

describe('calculation', function() {
  describe('trimDeg', function() {
    it('should return 0 when the value is 0', function() {
        expect(calculation.trimDeg(0)).to.equal(0);
    });
    
    it('should return -45 when the value is 315', function() {
        expect(calculation.trimDeg(-45)).to.equal(315);
    });
    
    it('should return 359 when the value is 359', function() {
        expect(calculation.trimDeg(359)).to.equal(359);
    });
    
    it('should return 0 when the value is 360', function() {
        expect(calculation.trimDeg(360)).to.equal(0);
    });

    it('should return 90 when the value is 450', function() {
        expect(calculation.trimDeg(450)).to.equal(90);
    });
  });
});
