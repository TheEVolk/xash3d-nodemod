import vec3 from "./vec3";

export default class Entity {
  public id: number;
  public netname: string;
  public health: number;
  public model: string;
  public globalname: string;
  public classname: string;
  public origin: vec3;
  public spawnflags: number;
  public flags: number;
}