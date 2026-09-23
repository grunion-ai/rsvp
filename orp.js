// Optimal recognition point: the letter the eye locks onto (Spritz rule).
export const orpIndex = (word) => {
  const n = word.length;
  return n <= 1 ? 0 : n <= 5 ? 1 : n <= 9 ? 2 : n <= 13 ? 3 : 4;
};

// Split text into words, keeping punctuation on the word for timing.
export const tokenize = (text) => text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);

// Milliseconds a word stays up at a given wpm. Sentence ends hold longest,
// numbers and long words hold too.
export const holdMs = (word, wpm) => {
  const base = 60000 / wpm;
  const end = /[.!?…]["')\]]?$/.test(word) ? 1.6 : /[,;:]["')\]]?$/.test(word) ? 1.3 : 1;
  const letters = word.replace(/[^\p{L}\p{N}]/gu, '').length;
  const long = letters > 12 ? 1.4 : letters > 8 ? 1.2 : 1;
  const digits = /\d/.test(word) ? 1.4 : 1;
  return Math.round(base * end * long * digits);
};

// Speed as a fraction of target wpm, by words read since the last start:
// 60% at the first word, full speed by word 30, so the eye settles in.
export const rampFactor = (since) => Math.min(1, 0.6 + 0.4 * Math.min(since, 30) / 30);

// Hold for a word, with the ramp applied.
export const pace = (word, wpm, since) => Math.round(holdMs(word, wpm) / rampFactor(since));

// Total reading time for a text at a wpm, in ms, ramp ignored.
export const totalMs = (words, wpm) => words.reduce((t, w) => t + holdMs(w, wpm), 0);
