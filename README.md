# rsvp

A rapid serial visual presentation reader. It shows one word at a time at a fixed point on screen, at the words-per-minute (wpm) rate you choose. One letter in each word, its optimal recognition point, is coloured red and pinned to the same horizontal position, so your eye never moves. Paste text or open a link that carries the text, press space, and read.

## Setup

rsvp is a single HTML file plus one small JavaScript module (`orp.js`). No build step, no dependencies. Open `index.html` in any browser, or serve the folder.

## Text input

Two ways to load text:

- Paste into the box.
- Open `index.html#text=<url-encoded text>`. Append `&autoplay=true` to start at once.

On a Mac, `bin/rsvp` opens rsvp with whatever is on the clipboard.

## Keys

| Key | Action |
| --- | --- |
| Space | Play and pause |
| Left / Right | Step ten words |
| Up / Down | Change speed by 25 wpm |
| R | Restart |

Speed range 150 to 900 wpm, default 350.

## Timing

A word before sentence-ending punctuation stays on screen 1.6 times as long as a plain word, one before a comma 1.3 times, one over eight letters 1.2 times.

## Design language

Instrument Serif (SIL Open Font License, bundled under `brand/fonts`) sets the wordmark and headings; Satoshi from Fontshare sets the reader word and controls.

Palette: bone `#ECF3EB`, ink `#0B0B0B`, signal red `#FC0210`. Dark mode inverts bone and ink; the red stays.

Tokens live in `brand/tokens.css`. The wordmark ships as `brand/logo-ink.svg` and `brand/logo-bone.svg`, with the optimal recognition point (the v) in red.

## Tests

```
node --test
```

## Roadmap

In order:

1. A hosted page at a grunion URL with a PWA manifest.
2. A Safari web extension that reads the page selection or Reader-mode article in one click; it ships to iOS through the same Xcode wrapper.
3. A Chrome manifest on the same extension code.

The earlier Python and pywebview Mac shell is retired.

## License

MIT.
