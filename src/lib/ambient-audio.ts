/**
 * Alpha — ambient spiritual pad, generated with the Web Audio API.
 *
 * No audio file is shipped: a slow, detuned drone (soft fifth + octave) is
 * synthesised and gently modulated, which keeps the intro weightless on
 * mobile. Nothing is created until the user's first interaction, so mobile
 * autoplay policies are respected.
 */

type Pad = {
  ctx: AudioContext;
  master: GainNode;
  stop: () => void;
};

let pad: Pad | null = null;

const VOICES = [110, 164.81, 220, 329.63];

export function startAmbient(volume = 0.16) {
  if (typeof window === "undefined") return;
  if (pad) {
    void pad.ctx.resume();
    pad.master.gain.cancelScheduledValues(pad.ctx.currentTime);
    pad.master.gain.linearRampToValueAtTime(volume, pad.ctx.currentTime + 2.2);
    return;
  }

  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return;

  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.4;

  filter.connect(master);
  master.connect(ctx.destination);

  const nodes: Array<OscillatorNode | GainNode> = [];

  VOICES.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;
    osc.detune.value = (i - 1.5) * 6;

    const g = ctx.createGain();
    g.gain.value = 0.24 / (i + 1);

    // slow breathing so the pad never feels static
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.035 + i * 0.017;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.1 / (i + 1);
    lfo.connect(lfoGain).connect(g.gain);
    lfo.start();

    osc.connect(g).connect(filter);
    osc.start();
    nodes.push(osc, g, lfo, lfoGain);
  });

  master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3.4);

  pad = {
    ctx,
    master,
    stop: () => {
      nodes.forEach((n) => {
        try {
          if ("stop" in n) (n as OscillatorNode).stop();
        } catch {
          /* already stopped */
        }
      });
      void ctx.close();
    },
  };
}

export function fadeAmbient(volume: number) {
  if (!pad) return;
  const now = pad.ctx.currentTime;
  pad.master.gain.cancelScheduledValues(now);
  pad.master.gain.linearRampToValueAtTime(Math.max(0.0001, volume), now + 1.1);
}

export function disposeAmbient() {
  pad?.stop();
  pad = null;
}
