// Toppr Answr case study (from the earlier site's case study). Same block layout as the
// other case studies (see components/CaseStudyBlocks.jsx); the hero is the card cover.
//
// Media still to come is left as placeholders at its final size. Each `media-grid` is one
// tall tile beside two stacked tiles (791 x 1040 and 791 x 512 each in the original).
const tall = 791 / 1040;
const half = 791 / 512;

export const topprAnswrCaseStudy = {
  heading: 'Toppr Answr App | Toppr (Acq. by Byjus) | Apr - Jul 2021',
  blocks: [
    { type: 'hero' },
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
      tall: { ratio: tall, alt: 'Click, Scan, Solve: scanning a physics question with the camera' },
      stack: [
        { ratio: half, alt: 'Crop guide: fit only one question in the box' },
        { ratio: half, alt: 'Continue studying list: Motion in one dimension, Alkane vs Alkyne, Linear Algebra' },
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
      tall: { ratio: tall, alt: 'Search results with matching questions and a button to chat with a mentor' },
      stack: [
        { ratio: half, alt: 'More from chapter: question sets for Systems of Particles and Rotational Motion' },
        { ratio: half, alt: 'Chat with a mentor about a velocity-time graph' },
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
      tall: { ratio: tall, alt: 'Physics chat: a student asks how to find the maximum acceleration from a v-t graph' },
      stack: [
        { ratio: half, alt: 'Rating the expert with emoji and compliments such as Awesome explanation and Lightning fast' },
        { ratio: half, alt: 'Session rated Excellent with the compliments Awesome Explanation and Lightning Fast' },
      ],
    },
    {
      type: 'text',
      title: 'Product Video',
      body: [],
    },
    { type: 'media', ratio: 16 / 9, alt: 'Toppr Answr product video' },
    {
      type: 'text',
      title: 'Business Impact',
      body: [
        'Integrating paid mentor sessions created a sustainable revenue model. After the initial free questions, users could purchase additional question credits, making the service both valuable for students and financially viable. This approach not only increased engagement but also provided a steady revenue stream, benefiting both students and the business.',
      ],
    },
    {
      type: 'text',
      body: ['Special mention to the contributors in Toppr Answr.', 'Gaurav Rukhana | Sagar Bhardwaj | Atmiya Jadvani'],
    },
  ],
};
