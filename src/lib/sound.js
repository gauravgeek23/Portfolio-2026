// Quiet, mechanical interface sounds, synthesised with Web Audio (no files to load). There's no
// pitched tone in them (that reads as a drum): each is a few milliseconds of filtered noise, the
// way a real switch sounds, and mouse and key clicks come as a press followed by a softer release.
//
//   tick   tabs, links, buttons            a mouse click: press, release
//   tap    opening a project, image, book  a keyboard key: press with a little plastic body, release
//   toggle the theme or sound switch       a switch: two crisp clicks
//   page   turning a page in the book      a short paper swish
//
// Sound is on by default and remembered per visitor (localStorage "sound": "on" / "off"). It's for
// mouse and trackpad use only: touch-only devices (no hover) stay silent, and the switch is hidden.

const KEY = 'sound';
let enabled = read();
let ctx = null;
let noise = null;
let last = 0;

function read() {
  try {
    return localStorage.getItem(KEY) !== 'off';
  } catch {
    return true;
  }
}

export function isSoundOn() {
  return enabled;
}

export function setSoundOn(on) {
  enabled = on;
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off');
  } catch {
    // Private mode: the choice lasts for this visit only.
  }
  window.dispatchEvent(new CustomEvent('soundchange', { detail: on }));
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    // One second of white noise, reused by every click.
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Every sound goes through one soft clipper, so a burst that happens to catch loud noise is
// rounded off instead of jumping out above the rest (no gain is added below the ceiling).
const CEILING = 0.2;

function bus(ac) {
  if (!ac.clipper) {
    const curve = new Float32Array(1024);
    for (let i = 0; i < curve.length; i += 1) {
      const x = (i / (curve.length - 1)) * 2 - 1;
      curve[i] = CEILING * Math.tanh(x / CEILING);
    }
    ac.clipper = ac.createWaveShaper();
    ac.clipper.curve = curve;
    ac.clipper.connect(ac.destination);
  }
  return ac.clipper;
}

// A burst of filtered noise: a near-instant attack and an exponential decay. Short decays
// (a few ms) are clicks; longer, low-passed ones are swishes.
function burst(ac, at, { freq, q = 1, decay, gain, type = 'bandpass', attack = 0.0006 }) {
  const src = ac.createBufferSource();
  src.buffer = noise;
  const filter = ac.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const env = ac.createGain();
  env.gain.setValueAtTime(0, at);
  env.gain.linearRampToValueAtTime(gain, at + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, at + attack + decay);
  src.connect(filter).connect(env).connect(bus(ac));
  src.start(at, Math.random() * 0.5);
  src.stop(at + attack + decay + 0.02);
}

const SOUNDS = {
  tick(ac, t) {
    // Press: a bright snap with a touch of switch resonance. Release: the same, quieter, higher.
    burst(ac, t, { freq: 2600, type: 'highpass', q: 0.7, decay: 0.006, gain: 0.16 });
    burst(ac, t, { freq: 5200, q: 5, decay: 0.012, gain: 0.05 });
    burst(ac, t + 0.055, { freq: 3400, type: 'highpass', q: 0.7, decay: 0.004, gain: 0.07 });
  },
  tap(ac, t) {
    // A key: snap, a short plastic "thock" under it, then the key coming back up.
    burst(ac, t, { freq: 2000, type: 'highpass', q: 0.7, decay: 0.006, gain: 0.075 });
    burst(ac, t, { freq: 1700, q: 2.5, decay: 0.022, gain: 0.025 });
    burst(ac, t + 0.07, { freq: 2600, type: 'highpass', q: 0.7, decay: 0.005, gain: 0.06 });
  },
  toggle(ac, t) {
    burst(ac, t, { freq: 3000, type: 'highpass', q: 0.7, decay: 0.005, gain: 0.14 });
    burst(ac, t + 0.04, { freq: 2400, type: 'highpass', q: 0.7, decay: 0.006, gain: 0.11 });
  },
  page(ac, t) {
    burst(ac, t, { freq: 1100, q: 0.6, decay: 0.16, gain: 0.035, type: 'lowpass', attack: 0.01 });
  },
};

const touchOnly = () => window.matchMedia('(hover: none)').matches;

export function play(kind = 'tick') {
  if (!enabled || !SOUNDS[kind] || touchOnly()) return;
  // Rapid repeats (double clicks, key repeat) play once.
  const now = performance.now();
  if (now - last < 40) return;
  last = now;
  const ac = audio();
  if (!ac) return;
  SOUNDS[kind](ac, ac.currentTime + 0.001);
}

// Interactive elements that "open" something get the deeper tap; data-sound on an element (or an
// ancestor) picks a sound explicitly, and data-sound="none" keeps it silent.
const CLICKABLE = 'a[href], button, [role="button"], [role="tab"], summary';
const OPENS = '.project-card, .zoomable, .intro__book';

export function initSounds() {
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest?.(CLICKABLE);
      if (!el || el.disabled || el.getAttribute('aria-disabled') === 'true') return;
      const chosen = el.closest('[data-sound]')?.dataset.sound;
      if (chosen === 'none') return;
      play(chosen || (el.matches(OPENS) ? 'tap' : 'tick'));
    },
    { capture: true },
  );
}
