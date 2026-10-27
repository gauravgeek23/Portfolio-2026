import spatialHome from '../../assets/case-studies/lottiefiles-vision-pro/spatial-home@1x.webp';
import spatialHome2x from '../../assets/case-studies/lottiefiles-vision-pro/spatial-home@2x.webp';
import browsingVideo from '../../assets/case-studies/lottiefiles-vision-pro/browsing.mp4';
import browsingPoster from '../../assets/case-studies/lottiefiles-vision-pro/browsing-poster.webp';
import dragDropVideo from '../../assets/case-studies/lottiefiles-vision-pro/drag-drop.mp4';
import dragDropPoster from '../../assets/case-studies/lottiefiles-vision-pro/drag-drop-poster.webp';
import filtersVideo from '../../assets/play/vision-navigation.mp4';
import filtersPoster from '../../assets/play/vision-navigation@2x.webp';
import productPageVideo from '../../assets/case-studies/lottiefiles-vision-pro/product-page.mp4';
import productPagePoster from '../../assets/case-studies/lottiefiles-vision-pro/product-page-poster.webp';
import maldives from '../../assets/case-studies/lottiefiles-vision-pro/maldives@1x.webp';
import maldives2x from '../../assets/case-studies/lottiefiles-vision-pro/maldives@2x.webp';

// LottieFiles for Vision Pro case study (Figma: Desktop - 9).
const evandro = { text: 'Evandro Hoffmann', href: 'https://www.linkedin.com/in/evandro-harrison-hoffmann/' };
const kelly = { text: 'Kelly Loh', href: 'https://www.linkedin.com/in/kellylohhh/' };
const sanjib = { text: 'Sanjib Paul', href: 'https://www.linkedin.com/in/sanjib-paul/' };

export const lottieVisionProCaseStudy = {
  heading: 'LottieFiles for Vision Pro | LottieFiles | Jan - Mar 2024',
  blocks: [
    { type: 'hero' },
    {
      type: 'callout',
      title: 'Team',
      body: '1 Designer (me), 1 Senior Visual designer for brand video 1 Head of Mobile, 1 Marketing Manager for Launch.',
    },
    {
      type: 'text',
      title: 'Breaking Barriers in Spatial Design',
      body: [
        'When our Head of iOS first shared a rough integration of LottieFiles within the Vision Pro environment, the design was functional but not yet refined. I took on the challenge of transforming this prototype into a polished, intuitive experience not for direct business growth, but as a marketing push to showcase possibilities and educate the community.',
      ],
    },
    { type: 'media', ratio: 2, src: spatialHome, src2x: spatialHome2x, alt: 'LottieFiles app icon on the Vision Pro home view, alongside Apple apps in a living room' },
    {
      type: 'text',
      body: [
        'The aim was to demonstrate that in spatial devices like Vision Pro, "Motion isn’t a limitation but a natural part of immersive 3D environments."',
      ],
    },
    {
      type: 'text',
      title: 'Effortless Animation Browsing',
      body: [
        'On the homepage, each card showcases a different animation, and users can smoothly scroll through them. A top search bar and simple filters like recent, popular and featured let users find the perfect animation quickly and easily.',
        'Personalized recommendations make the experience even more seamless as the profile is connected to the account.',
      ],
    },
    { type: 'media', ratio: 16 / 9, video: browsingVideo, poster: browsingPoster, alt: 'Scrolling through animation cards on the LottieFiles Vision Pro homepage' },
    {
      type: 'text',
      title: 'Drag - Drop - Done',
      body: [
        'Focus on the animation by just looking at it, hold it with your fingers, and drop it into your environment. The interaction feels smooth and natural, making it easy to place assets exactly where you need them. To keep the experience ergonomically pleasant, elements respond even to small, natural gestures, making interactions feel effortless and intuitive.',
      ],
    },
    { type: 'media', ratio: 16 / 9, video: dragDropVideo, poster: dragDropPoster, alt: 'Dragging an animation out of the app and dropping it into the room' },
    {
      type: 'text',
      title: 'Filters menu',
      body: [
        'Switch between Recent, Popular, or Featured to refine your search and get results that truly match what you’re looking for. These quick filters make discovery easier by surfacing fresh uploads, trending picks, or curated highlights, so you can discover the right animation without endless scrolling.',
      ],
    },
    { type: 'media', ratio: 16 / 9, video: filtersVideo, poster: filtersPoster, alt: 'Switching between Recent, Popular and Featured filters' },
    {
      type: 'text',
      title: 'Product Page',
      body: [
        'On the product page, every animation opens up with full control. You can tweak colors using built-in palettes, adjust the speed to fit your scene, or fine-tune frame rates for smoother playback. These quick edits let you customize an asset without ever leaving the experience.',
      ],
    },
    { type: 'media', ratio: 16 / 9, video: productPageVideo, poster: productPagePoster, alt: 'Product page with color palettes, speed and frame rate controls, and related animations' },
    {
      type: 'text',
      body: [
        'To keep discovery flowing, related animations are surfaced right below. Whether you want something in the same style or looking to explore variations, it’s easy to find and compare new options while staying focused on your project.',
      ],
    },
    {
      type: 'text',
      title: 'Product Video',
      body: [
        'To bring the story to life, we crafted a short promo video showcasing the refined interactions and seamless motion integration within the spatial design. Taking the UI I designed and reimagining it in the real world, the video captures how naturally LottieFiles fits into the Vision Pro environment making the experience feel both intuitive and inspiring.',
        ['Creative direction by ', kelly, '. Animation by ', sanjib],
      ],
    },
    { type: 'youtube', id: 'jg2b2mtd1xY', title: 'LottieFiles for Apple Vision Pro — product video' },
    {
      type: 'text',
      title: 'Learnings and Resources',
      body: [
        'Vision Pro is still new, there are very few resources on designing for spatial experiences. I faced similar challenges while learning how to build for it, but I’ve added a couple of useful research papers and design files here to help you explore and get started.',
      ],
    },
    {
      type: 'links',
      items: [
        { label: 'Apple Developer Guidelines for - vision OS', href: 'https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos' },
        { label: 'Apple Design Resources - visionOS (Figma)', href: 'https://www.figma.com/community/file/1253443272911187215/apple-design-resources-visionos' },
        { label: 'Research Paper : XRgonomics', href: 'https://dl.acm.org/doi/fullHtml/10.1145/3411764.3445349' },
        { label: 'Meta Research on AR/VR', href: 'https://www.facebook.com/business/news/insights/future-ar-vr' },
        { label: 'Designers Guide Blog - Anish Alok', href: 'https://medium.muz.li/beyond-screens-redefining-user-interfaces-and-experience-for-apple-visionpro-wwdc23-387ea95e580c' },
        { label: 'Spatial Interfaces - John Palmer', href: 'https://darkblueheaven.com/spatialinterfaces/?s=09' },
      ],
    },
    {
      type: 'text',
      title: 'Numbers and Closing Notes',
      body: [
        'Since this project was brand and education focused rather than growth-driven, the campaign still reached over 14.7K people across our organic social channels.',
        'We designed and built the entire product on the simulator, so we hadn’t experienced how users would truly visualize it. But during our company-wide retreat, I finally got the chance to try it and the moment I did, it felt incredibly delightful. Hats off to Apple and the Vision Pro team for building such an incredible technology.',
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: maldives,
      src2x: maldives2x,
      caption: 'Oaga Art Resort Maldives',
      alt: 'Gaurav wearing Apple Vision Pro at Oaga Art Resort, Maldives',
    },
    {
      type: 'text',
      body: [
        'Special mention to the contributors in LottieFiles for Vision Pro',
        [evandro, ' (iOS Developer) | ', kelly, ' (Creative direction) | ', sanjib, ' (Animator)'],
      ],
    },
  ],
};
