import hero from '../../assets/case-studies/iphone-kit/hero@1x.webp';
import hero2x from '../../assets/case-studies/iphone-kit/hero@2x.webp';
import statusBar from '../../assets/case-studies/iphone-kit/status-bar@1x.webp';
import statusBar2x from '../../assets/case-studies/iphone-kit/status-bar@2x.webp';
import cameraControl from '../../assets/case-studies/iphone-kit/camera-control@1x.webp';
import cameraControl2x from '../../assets/case-studies/iphone-kit/camera-control@2x.webp';
import mockups from '../../assets/case-studies/iphone-kit/mockups@1x.webp';
import mockups2x from '../../assets/case-studies/iphone-kit/mockups@2x.webp';
import artboards from '../../assets/case-studies/iphone-kit/artboards-grids@1x.webp';
import artboards2x from '../../assets/case-studies/iphone-kit/artboards-grids@2x.webp';
import guides from '../../assets/case-studies/iphone-kit/guides@1x.webp';
import guides2x from '../../assets/case-studies/iphone-kit/guides@2x.webp';
import community from '../../assets/case-studies/iphone-kit/community@1x.webp';
import community2x from '../../assets/case-studies/iphone-kit/community@2x.webp';

// iPhone Kit (Figma) case study (Figma: Portfolio Fall 2024, frame 311:3853).
// Same block layout as the other case studies (see components/CaseStudyBlocks.jsx).
export const iphoneKitCaseStudy = {
  heading: 'iPhone Kit (Figma) | Figma Community (Personal Project) | Apr 2020 - Present',
  // The card cover at full case-study width (Figma: Desktop - 2, side project card).
  hero: { src: hero, src2x: hero2x },
  blocks: [
    { type: 'hero' },
    {
      type: 'text',
      body: [
        'During a summer break in college, inspired by the support I received from the design community, I dedicated a week to help new designers by addressing a common challenge: finding resources for newer iPhone models. I created a comprehensive set of design components focused on status bars, aiming to make their entry into design smoother.',
      ],
    },
    {
      type: 'text',
      title: 'Problem Statement',
      body: [
        'Seeing the need, I put together a detailed set of components for status bars on popular iPhone models. As time went on, I kept adding to and improving this collection, incorporating essentials like home bars, dynamic Island mockups, artboards, and grids. My aim was to lend a hand to up-and-coming designers, motivated by my own early struggles and the common hurdles faced by my peers.',
      ],
    },
    {
      type: 'text',
      title: 'Status Bar',
      body: [
        'The status bar, a core element since inception, evolves with nested components, enabling seamless state transitions and countless customisations—all in dark mode.',
        'Dynamic Island, inspired by Apple, brings a fresh way to display states like compact, minimal, expanded, and incoming calls, now embraced by businesses.',
        'Optimised for iPhone 14, 15 & 16 with multiple variants for flexible, user-specific adaptation.',
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: statusBar,
      src2x: statusBar2x,
      alt: 'Status bar and Dynamic Island components with incoming call and now-playing states, plus the Battery property panel',
    },
    {
      type: 'text',
      body: [
        "Over the past few years, the scope of the project has grown significantly. Starting with status bars, it now includes a broad range of components. This expansion has been fueled by a keen understanding of designers' needs, detailed below.",
      ],
    },
    {
      type: 'text',
      title: 'Camera Control for iPhone 16',
      body: [
        'The status bar, a core element since inception, evolves with nested components, enabling seamless state transitions and countless customisations—all in dark mode.',
        'Dynamic Island, inspired by Apple, brings a fresh way to display states like compact, minimal, expanded, and incoming calls, now embraced by businesses.',
        'Optimised for iPhone 14, 15 & 16 with multiple variants for flexible, user-specific adaptation.',
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: cameraControl,
      src2x: cameraControl2x,
      alt: 'Camera Control overlays for iPhone 16 (Cameras, Ethereal, Tone and zoom) shown horizontally, vertically and on a camera screen',
    },
    {
      type: 'text',
      title: 'Mockups',
      body: [
        'Two mockup types are available:',
        'Hard Mockups – High-quality, exportable as high-res PNGs for tools like Photoshop and Framer.',
        'Insertable Mockups – Ideal for showcasing Figma mobile screens on platforms like Dribbble. Just drag your design into the left artboard for an instant, polished mockup.',
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: mockups,
      src2x: mockups2x,
      alt: 'A design dragged onto the left artboard appearing inside an iPhone mockup',
    },
    {
      type: 'text',
      title: 'Artboard & Grids',
      body: [
        'All artboard sizes are crafted to be pixel-perfect for each device, as specified in the community file. This includes the incorporation of a universal 4-column grid system, ensuring precise and consistent design standards.',
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: artboards,
      src2x: artboards2x,
      alt: 'iPhone 15 series artboards with a 4-column grid and the Columns settings panel',
    },
    {
      type: 'text',
      title: 'Guides',
      body: [
        'In the latest version, aimed to be more helpful by providing comprehensive guides within the community file. These guides offer detailed explanations on utilising every component effectively.',
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: guides,
      src2x: guides2x,
      alt: 'Guide pages from the community file: how to use the status and home bar, artboards and grids, and mockups',
    },
    {
      type: 'text',
      title: 'Community Love',
      body: [
        "I'm truly delighted to witness the community's appreciation for my contributions.",
        [
          'Access community file ',
          {
            text: 'here',
            href: 'https://www.figma.com/community/file/837799145528214755/status-bar-dynamic-island-mockup-for-iphone15-iphone14',
          },
        ],
      ],
    },
    // Three cards: title on top, description below (Figma: 77:16357).
    {
      type: 'stats',
      items: [
        {
          value: '100k+ Community Downloads',
          label: 'In last 4 year community support motivated to keep updating the file for them.',
        },
        {
          value: '2 times on top trending file',
          label: '2 times for a total of 26 days it became the top trending figma file recommendation.',
        },
        {
          value: 'Most relevant file for "iPhone" keyword',
          label: 'Whenever you search for iPhone or Dynamic Island in the community, I got you covered.',
        },
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: community,
      src2x: community2x,
      alt: 'Figma Community search for "iPhone 16" with iPhone 16 Camera Control by Gaurav Kumar as the top result',
    },
  ],
};
