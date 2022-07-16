/// <reference types="screeps" />
export {};
declare global {
    interface Array<T> {
        /** Sums the values of the elements of an array. */
        sum(this: Array<number | BodyPartConstant>): number;
    }
}
