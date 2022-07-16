/// <reference types="screeps" />
export declare class TransporterOptions implements CreepOptions {
    bodyParts: BodyPartConstant[];
    role: string;
    memoryAttributes: {
        [key: string]: any;
    };
    /**
     * Options used to customize a transporter creep.
     * @param maxCost The max cost to allocate to this creep.
     */
    constructor(maxCost: number);
    /**
     * Get the most bosy parts possible for a transporting creep, optimized as MOVE CARRY.
     * @param cost Max cost in energy to allocate to this spawning creep.
     * @returns The body parts that the cost allows.
     */
    private getBodyParts;
}
