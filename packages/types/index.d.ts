import type EngineFunctions from "./eng";
import type Entity from "./entity";
import type vec3 from './vec3';

export type { EngineFunctions, Entity, vec3 };

declare global {
  declare namespace nodemod {
    const eng: EngineFunctions;
    const continueServer: () => void;
    const players: Entity[];
  }
}