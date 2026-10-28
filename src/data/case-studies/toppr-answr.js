import hero from '../../assets/case-studies/toppr-answr/hero@1x.webp';
import hero2x from '../../assets/case-studies/toppr-answr/hero@2x.webp';
import scanningVideo from '../../assets/case-studies/toppr-answr/scanning.mp4';
import scanningPoster from '../../assets/case-studies/toppr-answr/scanning-poster.webp';
import cropGuide from '../../assets/case-studies/toppr-answr/crop-guide.webp';
import continueStudying from '../../assets/case-studies/toppr-answr/continue-studying.webp';
import searchVideo from '../../assets/case-studies/toppr-answr/search-results.mp4';
import searchPoster from '../../assets/case-studies/toppr-answr/search-results-poster.webp';
import moreFromChapter from '../../assets/case-studies/toppr-answr/more-from-chapter.webp';
import mentorChat from '../../assets/case-studies/toppr-answr/mentor-chat.webp';
import chatVideo from '../../assets/case-studies/toppr-answr/mentor-chat-video.mp4';
import chatPoster from '../../assets/case-studies/toppr-answr/mentor-chat-video-poster.webp';
import rateExpert from '../../assets/case-studies/toppr-answr/rate-expert.webp';
import sessionRated from '../../assets/case-studies/toppr-answr/session-rated.webp';

// Toppr Answr case study (from the earlier site's case study). Same block layout as the
// other case studies (see components/CaseStudyBlocks.jsx); the hero is the card cover.
//
// Each `media-grid` is a tall phone recording beside two stacked tiles of cut-out UI
// (791 x 512 each in the original).
const half = 791 / 512;

export const topprAnswrCaseStudy = {
  heading: 'Toppr Answr App | Toppr (Acq. by Byjus) | Apr - Jul 2021',
  hero: { src: hero, src2x: hero2x },
  blocks: [
    { type: 'hero' },
    {
      type: 'callout',
      title: 'Team',
      body: '1 Product Design Intern (me), working alongside the Toppr design team.',
    },
    {
      type: 'text',
      title: 'Introduction and Objective',
      body: [
        'The Toppr Answr project was designed to provide students with a robust, AI-driven solution for academic support. By allowing users to scan and upload images of their problem statements, the platform seamlessly integrated AI-generated solutions with the option to connect with human mentors, ensuring comprehensive academic assistance.',
      ],
    },
    {
      type: 'text',
      title: 'Onboarding and Scanning Experience',
      body: [
        'The journey starts with a simple onboarding that helps students take clear photos and crop their questions for accurate AI analysis. The intuitive interface ensures users can easily move from capturing the image to receiving relevant answers quickly.',
      ],
    },
    {
      type: 'media-grid',
      tall: { ratio: 1000 / 1436, video: scanningVideo, poster: scanningPoster, alt: 'Click, Scan, Solve: scanning a physics question with the camera' },
      stack: [
        { ratio: half, src: cropGuide, inset: 0.6, alt: 'Crop guide: fit only one question in the box' },
        { ratio: half, src: continueStudying, inset: 0.67, alt: 'Continue studying list: Motion in one dimension, Alkane vs Alkyne, Linear Algebra' },
      ],
    },
    {
      type: 'text',
      title: 'Connecting with a Mentor',
      body: [
        'For questions that require deeper understanding or where the AI solutions fall short, students can easily connect with a live mentor. This feature bridges the gap between automated assistance and personalised human help, ensuring that students always have access to the support they need. The first few mentor interactions are complimentary, fostering engagement, while additional sessions are available through a paid model.',
      ],
    },
    {
      type: 'media-grid',
      reverse: true,
      tall: { ratio: 1000 / 1436, video: searchVideo, poster: searchPoster, alt: 'Search results with matching questions and a button to chat with a mentor' },
      stack: [
        { ratio: half, src: moreFromChapter, inset: 0.69, align: 'end', alt: 'More from chapter: question sets for Systems of Particles and Rotational Motion' },
        { ratio: half, src: mentorChat, inset: 0.64, alt: 'Chat with a mentor about a velocity-time graph' },
      ],
    },
    {
      type: 'text',
      title: 'Chat and Mentor Feedback',
      body: [
        'The chat system offers a smooth user experience with predefined responses to simplify communication. After each interaction, students can rate their experience and provide feedback. This continuous feedback loop helps improve the quality of mentorship and the AI’s performance, ensuring a better user experience over time.',
      ],
    },
    {
      type: 'media-grid',
      tall: { ratio: 1000 / 1402, video: chatVideo, poster: chatPoster, alt: 'Physics chat: a student asks how to find the maximum acceleration from a v-t graph' },
      stack: [
        { ratio: half, src: rateExpert, inset: 0.6, align: 'end', alt: 'Rating the expert with emoji and compliments such as Awesome explanation and Lightning fast' },
        { ratio: half, src: sessionRated, inset: 0.72, alt: 'Session rated Excellent with the compliments Awesome Explanation and Lightning Fast' },
      ],
    },
    {
      type: 'text',
      title: 'Product Video',
      body: [],
    },
    { type: 'vimeo', id: '952692161', title: 'Toppr Answr product video' },
    {
      type: 'text',
      title: 'Business Impact',
      body: [
        'Integrating paid mentor sessions created a sustainable revenue model. After the initial free questions, users could purchase additional question credits, making the service both valuable for students and financially viable. This approach not only increased engagement but also provided a steady revenue stream, benefiting both students and the business.',
      ],
    },
    {
      type: 'text',
      body: [
        'Special mention to the contributors in Toppr Answr.',
        [
          { text: 'Gaurav Rukhana', href: 'https://www.linkedin.com/in/gaurav-rukhana-2688474b/' },
          ' | ',
          { text: 'Sagar Bhardwaj', href: 'https://x.com/sagar_ux' },
          ' | ',
          { text: 'Atmiya Jadvani', href: 'https://www.linkedin.com/in/atmiyajadvani/' },
        ],
      ],
    },
  ],
};
