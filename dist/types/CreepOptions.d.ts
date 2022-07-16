/// <reference types="screeps" />
export {};
declare global {
    /** Used to gather all the options necessary to spawn a new creep. */
    interface CreepOptions {
        /** The body parts the creep should spawn with. */
        bodyParts: BodyPartConstant[];
        /** The role the creep should have. */
        role: string;
        /** Override CreepMemory attributes using this. */
        memoryAttributes: {
            [key: string]: any;
        };
    }
}
