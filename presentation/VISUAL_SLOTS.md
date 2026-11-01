# Visual slots in the deck

Drop an image (webp, png, jpg, avif, gif) or a short muted .mp4 loop into `src/assets/deck/slots/`, named after its slot, e.g. `study-buddy.webp`. It replaces the placeholder on the next build. Images are cropped to fill the shape, so the suggested ratio is a guide, not a rule.

Until a slot is filled, the slide shows its name, what belongs there and the shape, so you can see the gaps while rehearsing. Remove a slot you won’t fill by deleting its `<Slot … />` line in `src/pages/deck/slidesAct1.jsx` or `slidesAct2.jsx`.

| Slide | File name | What goes there | Shape |
|---|---|---|---|
| 02 | `season-banner` | A wide filler: campus, students, an event from the season | 4/1 |
| 03 | `campus-bengaluru` | Bengaluru campus photo | 4/3 |
| 03 | `campus-delhi` | Delhi campus photo | 4/3 |
| 03 | `campus-hyderabad` | Hyderabad campus photo | 4/3 |
| 03 | `campus-pune` | Pune campus photo | 4/3 |
| 04 | `design-team` | The design team, or a working session | 4/5 |
| 05 | `brand-guidelines` | A page from the brand guidelines | 3/4 |
| 05 | `brand-campus` | A campus poster or banner | 3/4 |
| 05 | `brand-portal` | The central brand portal | 3/4 |
| 05 | `brand-social` | A social or ad creative | 3/4 |
| 06 | `website-home` | The redesigned homepage, desktop | 16/10 |
| 07 | `head-start` | Head Start course, phone screen | 9/16 |
| 07 | `pwa-install` | The PWA on a home screen | 9/16 |
| 07 | `study-buddy` | Study Buddy, phone screen | 9/16 |
| 09 | `referral` | The referral screen or invite flow | 4/5 |
| 10 | `application-page` | The application page | 16/9 |
| 10 | `notification-centre` | The notification centre | 16/9 |
| 11 | `team-working` | Cross-functional team, a review or launch moment | 4/5 |
| 13 | `old-exam` | The previous exam interface, if you have it | 4/3 |
| 17 | `testing-session` | Testing with students, or feedback notes | 4/5 |
| 18 | `code-editor` | The code, written with Claude | 16/10 |
| 18 | `design-file` | The Figma file for the exam | 16/10 |
| 19 | `student-feedback` | Student feedback, quotes or messages | 4/5 |
| 21 | `moment-1` | A filler photo from the season | 4/3 |
| 21 | `moment-2` | A filler photo from the season | 4/3 |
| 21 | `moment-3` | A filler photo from the season | 4/3 |
| 22 | `workspace` | A filler: your desk, sketches, a whiteboard | 4/5 |
| 24 | `closing` | A closing photo: you, the team, or a campus moment | 32/9 |

28 slots. The exam interface slides (cover, 12, 14–16, 20) already use the real screenshot.
