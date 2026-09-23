// Optimal recognition point: the letter the eye locks onto (Spritz rule).
export const orpIndex = (word) => {
  const n = word.length;
  return n <= 1 ? 0 : n <= 5 ? 1 : n <= 9 ? 2 : n <= 13 ? 3 : 4;
};

// Split text into words, keeping punctuation on the word for timing.
export const tokenize = (text) => text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);

// Milliseconds a word stays up at a given wpm. Sentence ends hold longest.
export const holdMs = (word, wpm) => {
  const base = 60000 / wpm;
  const end = /[.!?…]["')\]]?$/.test(word) ? 1.6 : /[,;:]["')\]]?$/.test(word) ? 1.3 : 1;
  const long = word.replace(/[^\p{L}\p{N}]/gu, '').length > 8 ? 1.2 : 1;
  return Math.round(base * end * long);
};

// Total reading time for a text at a wpm, in ms.
export const totalMs = (words, wpm) => words.reduce((t, w) => t + holdMs(w, wpm), 0);
