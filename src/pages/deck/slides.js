import {
  BigPicture,
  Brand,
  Cover,
  DesignFunction,
  Journey,
  Leadership,
  NextStep,
  Products,
  Referral,
  Scale,
  Website,
} from './slidesAct1';
import {
  ActTwo,
  Approach,
  Canvas,
  Closing,
  Constraints,
  DesignToCode,
  Lessons,
  Navigation,
  Outcome,
  Principles,
  Problem,
  Synthesis,
  WhatNext,
} from './slidesAct2';

const I = 'Act I · Building the growth system';
const II = 'Act II · Redesigning the exam experience';
const III = 'Act III · What the work taught me';

// Every slide: its component, chrome label, tone, minutes and speaker notes.
export const SLIDES = [
  {
    C: Cover,
    title: 'Cover',
    section: '',
    min: 0.5,
    notes: `Thanks for having me. Over the next 45 minutes I'll walk you through one admissions season at Newton School of Technology, 2025–26, and then go deep on one product inside it: the NSAT / NSET exam interface.

What you're looking at on the right is the real exam interface, on desktop and mobile. I'm putting it on the cover on purpose, because the story ends there. But it starts somewhere else: with a growth system, and a design function that didn't exist when I joined.`,
  },
  {
    C: BigPicture,
    title: 'The season was a system',
    section: I,
    min: 2,
    notes: `The single biggest idea in this talk: the season wasn't a campaign. It was a connected system.

A student discovered us through the brand and website, or through an acquisition product like Study Buddy, Head Start or a referral. They signed up, filled the application, paid for the NSAT, and then sat the exam. Each of those is owned by different people, and each is a place we can win or lose the student.

So the talk has two acts. Act I is building the growth system: brand, website, acquisition products, referral and the steps to payment. Act II zooms into the last step, the exam, which was the first prolonged product experience a student had with us. I'll close with what the work taught me.`,
  },
  {
    C: Journey,
    title: 'A high-intent journey',
    section: I,
    min: 2,
    notes: `The admissions season ran from September to June, with discovery peaking between December and March. That peak matters: whatever we shipped had to be ready before December, because that's when most students were arriving.

The journey had five stages: discovery, signup, the application form, NSAT payment, and the exam. Students applying are high-intent; they're making a decision about their next four years. But there are a lot of handoffs between teams and systems, and every handoff is a place a student can drop.

We ran this across four campuses, Delhi, Pune, Bengaluru and Hyderabad, which is part of why consistency became the first problem to solve. I'm deliberately not putting stage-by-stage conversion numbers on this slide; I'll only show the conversion figures we actually measured, on the next few slides.`,
  },
  {
    C: DesignFunction,
    title: 'Five verticals, one design function',
    section: I,
    min: 1.5,
    notes: `When I joined, there was no design team. I built and led it.

Design worked across five business verticals, and the job was to be one function serving all of them rather than five separate request queues. In practice that meant working daily with product, engineering, marketing, content and the academic teams.

The point isn't the org chart; it's that the same design decisions — the brand, the components, the patterns — had to hold across all five verticals. (Name the verticals here if asked.)`,
  },
  {
    C: Brand,
    title: 'One recognisable brand',
    section: I,
    min: 1.5,
    notes: `The first thing we did, in September 2025, was standardise the brand. Campus teams and central marketing were producing assets independently, and it showed: different logos, colours and photography across touchpoints.

We standardised logos, colours, typography, photography and product screenshots, and put everything in one central brand portal so every team pulled from the same source.

The reason this comes first in the story: none of the growth work that follows works if every touchpoint looks like a different organisation.`,
  },
  {
    C: Website,
    title: 'Website redesign',
    section: I,
    min: 2,
    notes: `Next was the website, the front door for the whole funnel. We redesigned 18 pages in 21 days, to land before the discovery peak.

The result: signup conversion went from 21.3% to 23.6%. That's a 2.3 percentage-point increase, measured at 98% confidence. I want to be precise: that's percentage points, not a percentage increase; I'm not rounding it into a bigger-sounding relative number.

Why did it move? Clearer hierarchy, consistent brand from the previous step, and a more direct path to signup. On a top-of-funnel this large, a couple of points of signup conversion is a lot of students.`,
  },
  {
    C: Products,
    title: 'Top-of-funnel products',
    section: I,
    min: 2,
    notes: `Beyond the website, we built products that created demand before anyone applied.

Study Buddy acquired 110,589 users, and 14.4% of Study Buddy users went on to pay for the NSAT. Head Start offered free coding courses in Python, C++ and fundamentals: a low-commitment way to experience how Newton teaches.

We also saw something interesting with the PWA. Students who added the PWA icon to their home screen converted to NSAT payment at a 23% higher rate than those who didn't, across Study Buddy and Head Start. I'm careful with that one: it's an observed difference, and more committed students are probably more likely to install it. It's a signal worth testing, not proof of cause.`,
  },
  {
    C: Scale,
    title: 'Season at a glance',
    section: I,
    min: 1.5,
    notes: `Zooming out to the whole season: 909,850 unique top-of-funnel acquisitions, and 15,930 unique payers. Dividing one by the other, about 1.75% of unique top-of-funnel acquisitions became unique payers. That's a derived number, and the bar is drawn to scale, which is why the payer bar is a sliver.

Separately, there were 20,152 payments. That number includes retries, so it's transactions, not students; it isn't part of the funnel and I don't mix it with the unique counts.

The business implication: with a top-of-funnel that wide and a conversion that narrow, small improvements at each step compound. That's why the next slides are about the steps after acquisition.`,
  },
  {
    C: Referral,
    title: 'Referral growth',
    section: I,
    min: 1.5,
    notes: `Referral was our highest-intent channel. 3,468 unique users came in through referral and 1,274 of them paid: a 36.7% referral-to-paid conversion. For context, that's far above the season-wide 1.75%, which makes sense: a friend's recommendation brings intent with it.

Referral conversion improved 21% year over year. That's a relative improvement; I'm not showing last year's rate because I don't want to put a baseline on screen that I can't source.

One note on the "9.38% of all paid" figure: it's as reported, and I'm confirming its base, because 1,274 out of the 15,930 unique payers would be 8.0%. I'd rather flag that than present it as exact.`,
  },
  {
    C: NextStep,
    title: 'Improving the next step',
    section: I,
    min: 1.5,
    notes: `Two examples of improving steps deeper in the funnel.

First, the notification centre. Students who saw it converted about 30% higher than those who didn't. Same caveat as the PWA: it's an observed difference; students who engage more are more likely to see it. I don't have the group sizes in this data, so I'm presenting it as a direction, not a result.

Second, the application page: 33,424 unique visitors and 15,930 unique payers, which is a 47.7% apply-to-paid conversion. Once a student reaches the application, they're very likely to pay, so making sure students reach it, and understand what happens next, was where design could help most.`,
  },
  {
    C: Leadership,
    title: 'Cross-functional leadership',
    section: I,
    min: 2,
    notes: `None of this was a design-only effort, and I want to be clear about who did what.

I worked with a product lead; a senior developer and eight engineers; around six marketers; content writers; and the academic and teaching teams. My role was design ownership, and staying close to funnel quality and the student experience so that design decisions were made with the numbers in view.

The outcomes on the previous slides belong to that whole group. What I contributed was making sure the student's journey stayed coherent across all of those teams.

And that brings us to the last step in the journey, the one I went deepest on.`,
  },
  {
    C: ActTwo,
    title: 'Act II: the exam',
    section: '',
    dark: true,
    min: 1,
    notes: `For most students, the exam was the first time they spent a long, uninterrupted stretch inside one of our products. Up to this point their interactions were short: a page, a form, a payment.

The exam is high-stakes, it's timed, and the student is under pressure. So any friction in the interface isn't just annoying; it's taking time and attention away from the thing they actually came to do.

For the next stretch I'll go through the problem, the principles, the interface itself, the constraints, how we built it, and what changed.`,
  },
  {
    C: Problem,
    title: 'The problem',
    section: II,

    min: 3,
    notes: `The core problem: students were learning the interface before they could take the exam.

The interface lacked cohesion. Students could spend roughly five to six minutes just understanding how it worked, and in a timed exam that's time taken directly from answering. Switching between sections meant unnecessary back-and-forth.

If I have a screenshot of the previous interface it's on this slide; otherwise I describe it rather than show a recreated "before".

The framing I used with the team: every second a student spends on the interface is a second not spent on the question.`,
  },
  {
    C: Principles,
    title: 'Design principles',
    section: II,
    min: 2.5,
    notes: `From that, three principles, and each one maps to a decision you can see in the shipped interface.

One: reduce cognitive load. One question at a time, four lettered options, and the selected answer is filled solid so it's unmistakable.

Two: make navigation predictable. Sections are tabs at the top; Previous and Next always sit in the same place at the bottom. Students shouldn't have to look for how to move.

Three: make progress and states clear. Every question state — not visited, attempted, un-attempted, marked for review, marked and answered — has its own colour and fill, and a legend that stays on screen, so nobody has to remember the code.`,
  },
  {
    C: Canvas,
    title: 'The new exam canvas',
    section: II,
    dark: true,
    min: 3,
    notes: `This is the redesigned exam, as shipped. Five decisions are numbered on it. (Hover any number to highlight the area.)

One: a full-width layout, so the question gets the width and long questions need less scrolling.
Two: a light/dark theme toggle in the header. Dark mode is there to reduce perceived glare over a long sitting; that's the intent, not a measured result.
Three: section tabs, so switching sections is one click instead of a hunt.
Four: question navigation on the right, a collapsible panel showing every question grouped by section.
Five: clearer question and review states, explained by the legend, with Mark for Review always next to the question.

Notice what's not here: no decoration. The timer and Submit are in the corner where students expect them, and everything else gets out of the way.`,
  },
  {
    C: Navigation,
    title: 'Navigation and question states',
    section: II,
    min: 3,
    notes: `Zooming into the navigation, because this is where the back-and-forth problem was solved.

One: section tabs switch sections directly, and the active one is highlighted, so you always know where you are.

Two: the question navigation gives an overview of the whole paper, grouped by section, with a count per section like 12 of 20. Students can see what's left without paging through.

Three: the states. The important nuance is "Marked and Answered": the legend tells students it will still be considered for evaluation. That removes a real anxiety about whether marking a question for review costs you the answer.

On mobile, the same overview opens as an "All questions" sheet, so the model is the same on every device.`,
  },
  {
    C: Constraints,
    title: 'Designing with constraints',
    section: II,
    min: 2.5,
    notes: `The experience had to fit the system underneath. Backend and storage integration were the major constraints: how answers and states were saved determined what the interface could promise.

Internal testing informed the design explorations. We contacted online students for feedback, and revised quiz and exam patterns were tested with a small group before the wider release.

I'm not going to give you a research sample size or a usability score here, because I don't have defensible numbers for those. What I can say is that the loop from student feedback back into design ran more than once before launch.`,
  },
  {
    C: DesignToCode,
    title: 'From design to shipped product',
    section: II,

    min: 2.5,
    notes: `How it got built. I owned the product thinking and the design. Then, working with Claude with the codebase as context, I implemented roughly 80% of the code myself. A developer then integrated it and shipped it in about two to three hours.

These are my own reported figures. The important part isn't the AI; it's that the person who made the design decisions also carried them into the real codebase, so less was lost in translation, and the developer's time went to integration and safety rather than rebuilding screens.

To be clear, AI didn't ship this on its own; developer integration is what took it to production.`,
  },
  {
    C: Outcome,
    title: 'Outcome',
    section: II,
    min: 2,
    notes: `The reported satisfaction score went from 3.7 to 4.2 out of 5.

I want to be honest about what that is. I still need to verify the baseline, the sample size, the exact question and how it was collected, so I'm not presenting this as a controlled experiment. It's a directional signal that students found the new experience better.

If you ask me what I'd measure with more time, it's on the next-steps slide: task completion and navigation friction, not just satisfaction.`,
  },
  {
    C: Synthesis,
    title: 'The interface should disappear',
    section: '',
    dark: true,
    min: 1.5,
    notes: `If I had to put the whole case study in one line: the interface should disappear, and the exam should remain.

Notice how the slide dims everything except the question. That's the goal for a student in an exam: their attention on the question, with the interface only there when they need to move, mark or submit.`,
  },
  {
    C: Lessons,
    title: 'What the season taught me',
    section: III,
    min: 2,
    notes: `Three lessons, each tied to a part of the story.

First, consistency across touchpoints reduces fragmented experiences. That was the brand system and the website.

Second, growth requires understanding the whole journey, not one conversion screen. The referral and application numbers only make sense next to the 1.75% season-wide figure.

Third, high-stakes product experiences deserve careful usability work. The exam was a small surface with an outsized effect on how students felt about us.`,
  },
  {
    C: Approach,
    title: 'How I approach product design',
    section: III,
    min: 2,
    notes: `This is how I work, and you can trace it through the whole season.

Start with the business goal. Identify the user problem. Define the critical journey. Design and validate. Partner with engineering to ship; in the exam's case, quite literally in the codebase. Then measure the outcome.

And measuring feeds the next round of understanding. It's a loop, not a line.`,
  },
  {
    C: WhatNext,
    title: 'What I would do next',
    section: III,
    min: 1.5,
    notes: `These are proposals, not things I've done.

First, validate the satisfaction baseline and methodology, so the 3.7 to 4.2 can stand up properly.

Then measure task completion and navigation friction, and look at performance across device types, because a lot of students take it on mobile.

And on an ongoing basis, keep testing question navigation and section switching, and connect interface changes to student confidence and completion rather than satisfaction alone.`,
  },
  {
    C: Closing,
    title: 'Closing',
    section: '',

    min: 0.5,
    notes: `What I hope came across: I care about how things look, but the reason is that clear experiences move the business forward.

Thank you. I'm happy to go deeper on any part, whether that's the growth numbers, the design team, or the exam interface.`,
  },
];
