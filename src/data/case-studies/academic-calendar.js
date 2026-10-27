import problemVideo from '../../assets/case-studies/academic-calendar/problem.mp4';
import problemPoster from '../../assets/case-studies/academic-calendar/problem-poster.webp';
import patternsVideo from '../../assets/case-studies/academic-calendar/patterns.mp4';
import patternsPoster from '../../assets/case-studies/academic-calendar/patterns-poster.webp';
import weeklyVideo from '../../assets/case-studies/academic-calendar/weekly.mp4';
import weeklyPoster from '../../assets/case-studies/academic-calendar/weekly-poster.webp';
import workspace from '../../assets/case-studies/academic-calendar/workspace@1x.webp';
import workspace2x from '../../assets/case-studies/academic-calendar/workspace@2x.webp';
import workspaceEvent from '../../assets/case-studies/academic-calendar/workspace-event@1x.webp';
import workspaceEvent2x from '../../assets/case-studies/academic-calendar/workspace-event@2x.webp';
import workspaceNotes from '../../assets/case-studies/academic-calendar/workspace-notes@1x.webp';
import workspaceNotes2x from '../../assets/case-studies/academic-calendar/workspace-notes@2x.webp';
import workspaceAssignments from '../../assets/case-studies/academic-calendar/workspace-assignments@1x.webp';
import workspaceAssignments2x from '../../assets/case-studies/academic-calendar/workspace-assignments@2x.webp';
import lifecycle from '../../assets/case-studies/academic-calendar/lifecycle@1x.webp';
import lifecycle2x from '../../assets/case-studies/academic-calendar/lifecycle@2x.webp';

// Academic Calendar case study (Figma: Desktop - 8).
// Block types: text, callout, cards, stats, media — rendered by components/CaseStudyBlocks.jsx.
// Media without `src`/`video` shows a sized placeholder. `mobile` swaps a wide composite
// for its pieces stacked top to bottom on small screens.
export const academicCalendarCaseStudy = {
  heading: 'Academic Calendar | Newton School of Technology | Jan - Feb 2025',
  blocks: [
    { type: 'hero' },
    {
      type: 'callout',
      title: 'Team',
      body: '1 Designer, 1 Full Stack Developer, 1 Product Manager, and 2 POCs from online and offline business verticals.',
    },
    {
      type: 'text',
      title: 'TL;DR',
      body: [
        'I designed a unified academic calendar for Newton School’s online and offline learning ecosystems, bringing schedules, class links, and learning resources into one role-based experience. I owned the end-to-end design and collaborated with developers through implementation.',
      ],
    },
    {
      type: 'text',
      title: 'The Problem — Academic information was everywhere',
      body: [
        'Timetables, class links, notes, learning resources like quiz assignments spread across different places like whatsapp, slack and on ground operations like notice boards. Students had to piece together their academic day, while staff managed scheduling across disconnected workflows.',
        { text: 'Problem statement:', strong: true },
        'How might we bring academic schedules and learning resources into one reliable experience across different roles and learning environments?',
      ],
    },
    { type: 'media', ratio: 2, video: problemVideo, poster: problemPoster, alt: 'Academic information scattered across Slack, WhatsApp, assignments, class links and timetables, brought into one calendar' },
    {
      type: 'text',
      title: 'Learning from Existing Patterns',
      body: [
        'I studied established calendar products to identify familiar patterns in navigation, weekly and monthly views, event cards, and event details. Rather than reinventing common interactions, I used these patterns as a foundation for a calendar that felt intuitive while addressing Newton School’s specific academic workflows.',
      ],
    },
    { type: 'media', ratio: 2, video: patternsVideo, poster: patternsPoster, alt: 'Screens from established calendar products studied for familiar patterns' },
    {
      type: 'text',
      title: 'Weekly and Monthly views',
      body: [
        'Students needed a clear weekly schedule, while teachers and administrators needed a broader planning view. Weekly and monthly layouts supported both needs, with the flexibility to switch between them.',
      ],
    },
    { type: 'media', ratio: 2, video: weeklyVideo, poster: weeklyPoster, alt: 'Weekly view of the Newton School academic calendar' },
    {
      type: 'text',
      title: 'One system, multiple roles',
      body: [
        'One calendar served multiple roles with different responsibilities. Students could view sessions and resources, while teachers and academic teams had additional controls to create, manage, and coordinate sessions.',
      ],
    },
    {
      type: 'cards',
      items: [
        { title: 'Students', list: ['Subject Level Filter', 'View only Access', 'Class joining Links', 'Assignments and quizes'] },
        { title: 'Teacher', list: ['Session creation', 'Slot booking', 'Lab scheduling', 'Session management'] },
        { title: 'Acads Team', list: ['Schedule coordination', 'Guest lectures', 'Coding contests', 'Session management'] },
      ],
    },
    {
      type: 'text',
      title: 'From a timetable to an academic workspace',
      body: [
        'Each calendar event connected the schedule to the actual learning experience. Students could access class links, lecture notes, questions, assignments, and quizzes directly from the event.',
      ],
    },
    {
      type: 'media',
      ratio: 1000 / 700,
      src: workspace,
      src2x: workspace2x,
      alt: 'Event details with join link, class notes, topics, assignments and quizzes',
      mobile: [
        { src: workspaceEvent, src2x: workspaceEvent2x, ratio: 988 / 1400, alt: 'Event details with join link, class notes, topics and tasks' },
        { src: workspaceNotes, src2x: workspaceNotes2x, ratio: 988 / 688, alt: 'Topics marked covered or pending, each with a link to notes' },
        { src: workspaceAssignments, src2x: workspaceAssignments2x, ratio: 988 / 688, alt: 'Assignments tagged in class or post class' },
      ],
    },
    {
      type: 'text',
      title: 'Class Lifecycle',
      body: [
        'The experience adapted as a session progressed—from upcoming to live and completed. The join button activated 15 minutes before class, while post-class resources remained accessible through the event.',
      ],
    },
    { type: 'media', ratio: 2, src: lifecycle, src2x: lifecycle2x, alt: 'A 3–4 PM class moving through before, joining, during and post-class states' },
    {
      type: 'text',
      title: 'Conclusion',
      body: [
        'The calendar was taken from design to development in approximately 4–4.5 weeks, with close developer collaboration and my involvement in implementation. The available usage figures indicate the scale of the product across Newton School’s learning ecosystem.',
      ],
    },
    {
      type: 'stats',
      items: [
        { value: '3,127', label: 'Enrolled Students' },
        { value: '2,300 +', label: 'Weekly active users' },
        { value: '1,700 +', label: 'Weekday daily active users' },
      ],
    },
    {
      type: 'text',
      title: 'Learnings:',
      body: [
        'Familiar patterns reduce the learning curve, role-specific defaults make complex systems easier to navigate, and flexible weekly/monthly views help different users plan at different levels. Designing for the full class lifecycle makes a calendar more than just a schedule.',
      ],
    },
  ],
};
