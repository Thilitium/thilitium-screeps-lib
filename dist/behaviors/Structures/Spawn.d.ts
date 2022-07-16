/// <reference types="screeps" />
export declare class Spawn {
    static checkNumberOfCreepsAndSpawn(spawner: StructureSpawn, role: string, limitOfWorker: number, level: number | BodyPartConstant[]): void;
    /**
     * Calcultates the cost of the body parts of a creep.
     * @param {int[]} parts The array of constants representing the body parts for which to get the price for.
     * @returns {int} The price of the combined body parts.
     */
    private static bodyPartsCost;
}
