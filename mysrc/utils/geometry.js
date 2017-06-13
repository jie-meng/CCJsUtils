const geometry = {
    
    /**
     * Helper function that creates a geometry.Point.
     * @function
     * @param {Number|geometry.Point} x a Number or a size object
     * @param {Number} y
     * @return {geometry.Point}
     * @example
     * var point1 = geometry.p();
     * var point2 = geometry.p(100, 100);
     * var point3 = geometry.p(point2);
     * var point4 = geometry.p({x: 100, y: 100});
     */
    p: function (x, y) {
        // This can actually make use of "hidden classes" in JITs and thus decrease
        // memory usage and overall performance drastically
        // return geometry.p(x, y);
        // but this one will instead flood the heap with newly allocated hash maps
        // giving little room for optimization by the JIT,
        // note: we have tested this item on Chrome and firefox, it is faster than geometry.p(x, y)
        if (x === undefined)
            return {x: 0, y: 0};
        if (y === undefined)
            return {x: x.x, y: x.y};
        return {x: x, y: y};
    },

    /**
     * Check whether a point's value equals to another
     * @function
     * @param {geometry.Point} point1
     * @param {geometry.Point} point2
     * @return {Boolean}
     */
    pointEqualToPoint: function (point1, point2) {
        return point1 && point2 && (point1.x === point2.x) && (point1.y === point2.y);
    },

    /**
     * Helper function that creates a geometry.Size.
     * @function
     * @param {Number|geometry.Size} w width or a size object
     * @param {Number} h height
     * @return {geometry.Size}
     * @example
     * var size1 = geometry.size();
     * var size2 = geometry.size(100,100);
     * var size3 = geometry.size(size2);
     * var size4 = geometry.size({width: 100, height: 100});
     */
    size: function (w, h) {
        // This can actually make use of "hidden classes" in JITs and thus decrease
        // memory usage and overall performance drastically
        //return geometry.size(w, h);
        // but this one will instead flood the heap with newly allocated hash maps
        // giving little room for optimization by the JIT
        // note: we have tested this item on Chrome and firefox, it is faster than geometry.size(w, h)
        if (w === undefined)
            return {width: 0, height: 0};
        if (h === undefined)
            return {width: w.width, height: w.height};
        return {width: w, height: h};
    },

    /**
     * Check whether a point's value equals to another
     * @function
     * @param {geometry.Size} size1
     * @param {geometry.Size} size2
     * @return {Boolean}
     */
    sizeEqualToSize: function (size1, size2) {
        return (size1 && size2 && (size1.width === size2.width) && (size1.height === size2.height));
    },

    /**
     * Helper function that creates a geometry.Rect.
     * @function
     * @param {Number|geometry.Rect} x a number or a rect object
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     * @returns {geometry.Rect}
     * @example
     * var rect1 = geometry.rect();
     * var rect2 = geometry.rect(100,100,100,100);
     * var rect3 = geometry.rect(rect2);
     * var rect4 = geometry.rect({x: 100, y: 100, width: 100, height: 100});
     */
    rect: function (x, y, w, h) {
        if (x === undefined)
            return {x: 0, y: 0, width: 0, height: 0};
        if (y === undefined)
            return {x: x.x, y: x.y, width: x.width, height: x.height};
        return {x: x, y: y, width: w, height: h };
    },

    rectEqualToRect: function (rect1, rect2) {
        return rect1 && rect2 && (rect1.x === rect2.x) && (rect1.y === rect2.y) && (rect1.width === rect2.width) && (rect1.height === rect2.height);
    },

    _rectEqualToZero: function(rect){
        return rect && (rect.x === 0) && (rect.y === 0) && (rect.width === 0) && (rect.height === 0);
    },

    /**
     * Check whether the rect1 contains rect2
     * @function
     * @param {geometry.Rect} rect1
     * @param {geometry.Rect} rect2
     * @return {Boolean}
     */
    rectContainsRect: function (rect1, rect2) {
        if (!rect1 || !rect2)
            return false;
        return !((rect1.x >= rect2.x) || (rect1.y >= rect2.y) ||
            ( rect1.x + rect1.width <= rect2.x + rect2.width) ||
            ( rect1.y + rect1.height <= rect2.y + rect2.height));
    },

    /**
     * Returns the rightmost x-value of a rect
     * @function
     * @param {geometry.Rect} rect
     * @return {Number} The rightmost x value
     */
    rectGetMaxX: function (rect) {
        return (rect.x + rect.width);
    },

    /**
     * Return the midpoint x-value of a rect
     * @function
     * @param {geometry.Rect} rect
     * @return {Number} The midpoint x value
     */
    rectGetMidX: function (rect) {
        return (rect.x + rect.width / 2.0);
    },
    
    /**
     * Returns the leftmost x-value of a rect
     * @function
     * @param {geometry.Rect} rect
     * @return {Number} The leftmost x value
     */
    rectGetMinX: function (rect) {
        return rect.x;
    },

    /**
     * Return the topmost y-value of a rect
     * @function
     * @param {geometry.Rect} rect
     * @return {Number} The topmost y value
     */
    rectGetMaxY: function (rect) {
        return(rect.y + rect.height);
    },

    /**
     * Return the midpoint y-value of `rect'
     * @function
     * @param {geometry.Rect} rect
     * @return {Number} The midpoint y value
     */
    rectGetMidY: function (rect) {
        return rect.y + rect.height / 2.0;
    },

    /**
     * Return the bottommost y-value of a rect
     * @function
     * @param {geometry.Rect} rect
     * @return {Number} The bottommost y value
     */
    rectGetMinY: function (rect) {
        return rect.y;
    },

    /**
     * Check whether a rect contains a point
     * @function
     * @param {geometry.Rect} rect
     * @param {geometry.Point} point
     * @return {Boolean}
     */
    rectContainsPoint: function (rect, point) {
        return (point.x >= geometry.rectGetMinX(rect) && point.x <= geometry.rectGetMaxX(rect) &&
            point.y >= geometry.rectGetMinY(rect) && point.y <= geometry.rectGetMaxY(rect)) ;
    },

    /**
     * Check whether a rect intersect with another
     * @function
     * @param {geometry.Rect} rectA
     * @param {geometry.Rect} rectB
     * @return {Boolean}
     */
    rectIntersectsRect: function (ra, rb) {
        var maxax = ra.x + ra.width,
            maxay = ra.y + ra.height,
            maxbx = rb.x + rb.width,
            maxby = rb.y + rb.height;
        return !(maxax < rb.x || maxbx < ra.x || maxay < rb.y || maxby < ra.y);
    },

    /**
     * Check whether a rect overlaps another
     * @function
     * @param {geometry.Rect} rectA
     * @param {geometry.Rect} rectB
     * @return {Boolean}
     */
    rectOverlapsRect: function (rectA, rectB) {
        return !((rectA.x + rectA.width < rectB.x) ||
            (rectB.x + rectB.width < rectA.x) ||
            (rectA.y + rectA.height < rectB.y) ||
            (rectB.y + rectB.height < rectA.y));
    },

    /**
     * Returns the smallest rectangle that contains the two source rectangles.
     * @function
     * @param {geometry.Rect} rectA
     * @param {geometry.Rect} rectB
     * @return {geometry.Rect}
     */
    rectUnion: function (rectA, rectB) {
        var rect = geometry.rect(0, 0, 0, 0);
        rect.x = Math.min(rectA.x, rectB.x);
        rect.y = Math.min(rectA.y, rectB.y);
        rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
        rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
        return rect;
    },

    /**
     * Returns the overlapping portion of 2 rectangles
     * @function
     * @param {geometry.Rect} rectA
     * @param {geometry.Rect} rectB
     * @return {geometry.Rect}
     */
    rectIntersection: function (rectA, rectB) {
        var intersection = cc.rect(
            Math.max(cc.rectGetMinX(rectA), cc.rectGetMinX(rectB)),
            Math.max(cc.rectGetMinY(rectA), cc.rectGetMinY(rectB)),
            0, 0);

        intersection.width = Math.min(cc.rectGetMaxX(rectA), cc.rectGetMaxX(rectB)) - cc.rectGetMinX(intersection);
        intersection.height = Math.min(cc.rectGetMaxY(rectA), cc.rectGetMaxY(rectB)) - cc.rectGetMinY(intersection);
        return intersection;
    },
    
    line: function (x1, y1, x2, y2) {
        if (x2 === undefined && y2 == undefined) {
            return {x1: x1.x, y1: x1.y, x2: y1.x, y2: y1.y};
        }
        
        return {x1: x1, y1: y1, x2: x2, y2: y2};
    },
    
    rectIntersectsLine: function (rect, line) {
        const minX = rect.x;
        const minY = rect.y;
        const maxX = rect.x + rect.width;
        const maxY = rect.y + rect.height;
        
        if ((line.x1 <= minX && line.x2 <= minX) || (line.y1 <= minY && line.y2 <= minY) || (line.x1 >= maxX && line.x2 >= maxX) || (line.y1 >= maxY && line.y2 >= maxY)) {
            return false;
        }

        let m = (line.y2 - line.y1) / (line.x2 - line.x1);

        let y = m * (minX - line.x1) + line.y1;
        if (y > minY && y < maxY) {
            return true;
        }

        y = m * (maxX - line.x1) + line.y1;
        if (y > minY && y < maxY) {
            return true;
        }

        let x = (minY - line.y1) / m + line.x1;
        if (x > minX && x < maxX) {
            return true;
        }

        x = (maxY - line.y1) / m + line.x1;
        if (x > minX && x < maxX) {
            return true;
        }

        return false;
    },
};

export default geometry;
