export { };

declare global {
    interface Array<T> {
        /** Sums the values of the elements of an array. */
        sum(this: Array<number | BodyPartConstant>): number;
    }
}

Array.prototype.sum = function (this: Array<number | BodyPartConstant>): number {
    const numbers: number[] = this instanceof Array<number> ?
        this as number[] :
        (this as Array<BodyPartConstant>).map((part: BodyPartConstant) => BODYPART_COST[part]);

    return numbers.reduce((acc, now) => acc + now, 0);
};