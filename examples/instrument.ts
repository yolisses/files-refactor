import type { InstrumentData } from "$lib/data/instrumentData";
import { getEffects } from "$lib/effect/create/getEffects";
import type { Effect } from "$lib/effect/effect";
import { isDefined } from "$lib/utils/isDefined";
import { Sound } from "./sound";
import { Synth } from "./synth";

// TODO consider dissolving tiers folder
// and join instrument files
export class Instrument {
  synth: Synth;
  sounds: Sound[];
  effects: Effect[];

  constructor(
    public data: InstrumentData,
    soundOptions: Sound[],
    effectOptions: Effect[]
  ) {
    this.effects = getEffects(effectOptions, data);
    this.sounds = this.getSounds(soundOptions);
    this.synth = new Synth(this);
  }

  private getSounds(soundOptions: Sound[]): Sound[] {
    return this.data.soundIds
      .map((soundId) => {
        return soundOptions.find((sound) => {
          return sound.id === soundId;
        });
      })
      .filter(isDefined);
  }

  get id(): string {
    return this.data.id;
  }
  get name(): string {
    return this.data.name;
  }
  get channel(): string {
    return this.data.channel;
  }
  get volume(): number {
    return this.data.volume;
  }
}
