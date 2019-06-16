"use strict";
exports.__esModule = true;
var Tile = /** @class */ (function () {
    function Tile(x, y, grid, isWall, unit) {
        if (isWall === void 0) { isWall = false; }
        if (unit === void 0) { unit = null; }
        this.x = x;
        this.y = y;
        this.grid = grid;
        this.unit = unit;
        this.isWall = isWall;
    }
    Object.defineProperty(Tile.prototype, "isPassable", {
        get: function () {
            return !this.isWall && this.unit === null;
        },
        enumerable: true,
        configurable: true
    });
    return Tile;
}());
exports.Tile = Tile;
var Grid = /** @class */ (function () {
    function Grid(width, height) {
        if (height === void 0) { height = width; }
        this.width = width;
        this.height = height;
        this.grid = [];
        for (var y = 0; y < height; y++) {
            var row = [];
            for (var x = 0; x < width; x++) {
                var grid = this;
                row.push(new Tile(x, y, grid));
            }
            this.grid.push(row);
        }
    }
    Grid.prototype.validate = function (a, b) {
        if (b === void 0) { b = a; }
        if (a.grid !== this || b.grid !== this) {
            throw new Error('Tile(s) must belong to the grid.');
        }
    };
    /** ignores obstacles */
    Grid.prototype.getDistance = function (a, b) {
        this.validate(a, b);
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };
    Grid.prototype.djikstra = function (origin) {
        var _this = this;
        this.validate(origin);
        var output = [[origin]];
        var checked = [origin];
        var done = false;
        var distance = 0;
        while (done === false) {
            var length_1 = output.length;
            output[distance].forEach(function (tile) {
                var x = tile.x, y = tile.y;
                var newCoords = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
                newCoords.forEach(function (_a) {
                    var x = _a[0], y = _a[1];
                    if (x >= 0 && x < _this.width && y >= 0 && y < _this.width) {
                        var tile_1 = _this.grid[x][y];
                        if (!checked.includes(tile_1)) {
                            checked.push(tile_1);
                            var isPassable = tile_1.isPassable;
                            if (isPassable) {
                                var newDistance = distance + 1;
                                output[newDistance]
                                    ? output[newDistance].push(tile_1)
                                    : (output[newDistance] = [tile_1]);
                            }
                        }
                    }
                });
            });
            if (length_1 === output.length) {
                done = true;
            }
            distance++;
        }
        var objOutput = {};
        output.forEach(function (row, index) {
            objOutput[index] = row.slice();
        });
        return objOutput;
    };
    return Grid;
}());
exports.Grid = Grid;
