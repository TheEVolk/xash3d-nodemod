import EngineFunctions from "./eng";
import Entity from "./entity";
import vec3 from './vec3';

export { EngineFunctions, Entity, vec3 };

declare class nodemod {
  static eng: EngineFunctions;
  static continue: () => void;
  static players: Entity[];
}
