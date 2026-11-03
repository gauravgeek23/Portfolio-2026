// Quiet interface sounds, synthesised with Web Audio (no files to load): a short filtered noise
// burst gives the "click" of a key or mouse, a tiny pitched tail gives it body. Every sound is
// a few tens of milliseconds and well below speech level.
//
//   tick   tabs, links, buttons            a light mouse click
//   tap    opening a project, image, book  a softer, deeper "thock"
//   toggle the theme or sound switch       two quick ticks
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

// A burst of band-passed noise with a fast attack and an exponential decay.
function burst(ac, at, { freq, q = 1.2, decay, gain, type = 'bandpass' }) {
  const src = ac.createBufferSource();
  src.buffer = noise;
  const filter = ac.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const env = ac.createGain();
  env.gain.setValueAtTime(0, at);
  env.gain.linearRampToValueAtTime(gain, at + 0.002);
  env.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  src.connect(filter).connect(env).connect(ac.destination);
  src.start(at, Math.random() * 0.5);
  src.stop(at + decay + 0.02);
}

// A short sine tail, optionally gliding down in pitch.
function tone(ac, at, { from, to = from, decay, gain }) {
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(from, at);
  osc.frequency.exponentialRampToValueAtTime(to, at + decay);
  const env = ac.createGain();
  env.gain.setValueAtTime(0, at);
  env.gain.linearRampToValueAtTime(gain, at + 0.003);
  env.gain.exponentialRampToValueAtTime(0.0001, at + decay);
  osc.connect(env).connect(ac.destination);
  osc.start(at);
  osc.stop(at + decay + 0.02);
}

const SOUNDS = {
  tick(ac, t) {
    burst(ac, t, { freq: 3600, q: 1.6, decay: 0.022, gain: 0.05 });
    tone(ac, t, { from: 1800, to: 1500, decay: 0.018, gain: 0.012 });
  },
  tap(ac, t) {
    burst(ac, t, { freq: 1500, q: 1, decay: 0.04, gain: 0.06 });
    tone(ac, t, { from: 420, to: 260, decay: 0.07, gain: 0.05 });
  },
  toggle(ac, t) {
    burst(ac, t, { freq: 3200, q: 1.6, decay: 0.02, gain: 0.045 });
    burst(ac, t + 0.07, { freq: 2400, q: 1.6, decay: 0.024, gain: 0.04 });
  },
  page(ac, t) {
    burst(ac, t, { freq: 1100, q: 0.6, decay: 0.16, gain: 0.035, type: 'lowpass' });
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
