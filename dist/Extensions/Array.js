"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(Array.prototype, 'sum', {
    value: function () {
        const numbers = this instanceof (Array) ?
            this :
            this.map((part) => BODYPART_COST[part]);
        return numbers.reduce((acc, now) => acc + now, 0);
    }
});
//# sourceMappingURL=Array.js.map