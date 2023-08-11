import vec3 from "./vec3";

declare global {
  class Entity {
    public id: number;
    public classname: string;
    public globalname: string;
    public origin: vec3;
    public oldorigin: vec3;
    public velocity: vec3;
    public basevelocity: vec3;
    public clbasevelocity: vec3;
    public movedir: vec3;
    public angles: vec3;
    public avelocity: vec3;
    public punchangle: vec3;
    public vAngle: vec3;
    public endpos: vec3;
    public startpos: vec3;
    public fixangle: number;
    public modelindex: number;
    public model: string;
    public viewmodel: number;
    public weaponmodel: number;
    public absmin: vec3;
    public absmax: vec3;
    public mins: vec3;
    public maxs: vec3;
    public size: vec3;
    public movetype: number;
    public solid: number;
    public skin: number;
    public body: number;
    public effects: number;
    public lightLevel: number;
    public sequence: number;
    public gaitsequence: number;
    public rendermode: number;
    public rendercolor: vec3;
    public renderfx: number;
    public health: number; // TODO: float
    public frags: number; // TODO: float
    public weapons: number;
    public deadflag: number;
    public viewOfs: vec3;
    public button: number;
    public impulse: number;
    public spawnflags: number;
    public flags: number;
    public colormap: number;
    public team: number;
    public armorvalue: number; // TODO: float
    public waterlevel: number;
    public watertype: number;
    public target: string;
    public targetname: string;
    public netname: string;
    public message: string;
    public noise: string;
    public noise1: string;
    public noise2: string;
    public noise3: string;
    public playerclass: number;
    public weaponanim: number;
    public pushmsec: number;
    public bInDuck: number;
    public flTimeStepSound: number;
    public flSwimTime: number;
    public flDuckTime: number;
    public iStepLeft: number;
    public gamestate: number;
    public oldbuttons: number;
    public groupinfo: number;
    
    public constructor(className: string);
    public use?(executor: Entity);
  }
}
