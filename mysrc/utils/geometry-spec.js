import { expect } from 'chai';
import geometry from './geometry';

describe('geometry', () => {
    describe('line', () => {
        it('should return { x1: 1, y1: 2, x2: 3, y2: 4 } when arguments are (1, 2, 3, 4)', () => {
            const line = geometry.line(1, 2, 3, 4);
            expect(line.x1).to.equal(1);
            expect(line.y1).to.equal(2);
            expect(line.x2).to.equal(3);
            expect(line.y2).to.equal(4);
        });
        
        it('should return { x1: 100, y1: 200, x2: 300, y2: 400 } when arguments are (geometry.p(100, 200), geometry.p(300, 400))', () => {
            const line = geometry.line(geometry.p(100, 200), geometry.p(300, 400));
            expect(line.x1).to.equal(100);
            expect(line.y1).to.equal(200);
            expect(line.x2).to.equal(300);
            expect(line.y2).to.equal(400);
        });
    });
    
    describe('rectIntersectsLine', () => {
        describe('given rect(100, 100, 200, 100)', () => {
            const rect = geometry.rect(100, 100, 200, 100);
            
            //line in rect
            it('should return true when line is (150, 150, 150, 151)', () => {
                expect(geometry.rectIntersectsLine(rect, geometry.line(150, 150, 150, 151))).to.equal(true);
            });
            
            it('should return true when line is (200, 150, 220, 180)', () => {
                expect(geometry.rectIntersectsLine(rect, geometry.line(200, 150, 220, 180))).to.equal(true);
            });
            
            //line intersect with rect
            it('should return true when line is (200, 150, 500, 600)', () => {
                expect(geometry.rectIntersectsLine(rect, geometry.line(200, 150, 500, 600))).to.equal(true);
            });
            
            //line touch border of rect
            it('should return false when line is (300, 200, 301, 201)', () => {
                expect(geometry.rectIntersectsLine(rect, geometry.line(300, 200, 301, 201))).to.equal(false);
            });
            
            //line outside rect
            it('should return false when line is (400, 300, 500, 600)', () => {
                expect(geometry.rectIntersectsLine(rect, geometry.line(400, 300, 500, 600))).to.equal(false);
            });
            
            it('should return false when line is (90, 105, 105, 90)', () => {
                expect(geometry.rectIntersectsLine(rect, geometry.line(90, 105, 105, 90))).to.equal(false);
            });
        });
    });
});