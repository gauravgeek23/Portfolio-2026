import hero from '../../assets/case-studies/iconscout-plugin/hero@1x.webp';
import hero2x from '../../assets/case-studies/iconscout-plugin/hero@2x.webp';
import pluginPage from '../../assets/case-studies/iconscout-plugin/plugin-page@1x.webp';
import pluginPage2x from '../../assets/case-studies/iconscout-plugin/plugin-page@2x.webp';
import figma from '../../assets/icons/brands/figma.svg';
import youtube from '../../assets/icons/brands/youtube.svg';
import x from '../../assets/icons/brands/x.svg';
import figstats from '../../assets/icons/brands/figstats.svg';

// IconScout Plugin case study (from the earlier site's case study). Same block layout as
// the other case studies (see components/CaseStudyBlocks.jsx).
export const iconscoutPluginCaseStudy = {
  heading: 'IconScout Plugin | LottieFiles | Jul - Dec 2023',
  hero: { src: hero, src2x: hero2x },
  blocks: [
    { type: 'hero' },
    {
      type: 'text',
      title: 'Ranked #14 among the most-used Figma plugins, IconScout is trusted by 1M+ designers worldwide.',
      body: [
        'Sometimes, one project reminds you why you became a designer in the first place. This wasn’t built to impress or sit nicely in a portfolio—it started as an attempt to solve a real problem I personally faced. It carries forward an existing legacy, but also marks a shift toward taking ownership and building the next version of the product with intent.',
        'Over six months, the work evolved from a rough idea into a fully shipped Figma plugin. Through continuous iteration, we shipped 17 meaningful feature updates and saw the product grow from 300 daily users to 1,400+ organically.',
        'If you work daily in Figma, this isn’t meant to be read like a traditional case study—it’s an experience designed to be explored hands-on.',
      ],
    },
    {
      type: 'links',
      items: [
        { label: 'Plugin Link', logo: figma, href: 'https://www.figma.com/community/plugin/744098704933821409' },
        { label: 'Product Video', logo: youtube, href: 'https://www.youtube.com/watch?v=VlH-Cf79X1c' },
        { label: '1 Million users', logo: x, logoMono: true, href: 'https://x.com/reallynattu/status/1971477965428154863' },
        { label: 'Rank #15 Plugin on Figma', logo: figstats, href: 'https://fig-stats.com/plugins/744098704933821409' },
      ],
    },
    {
      type: 'media',
      ratio: 2,
      src: pluginPage,
      src2x: pluginPage2x,
      alt: 'The IconScout plugin page in Figma: Icons, Illustrations, 3D Assets & Lottie Animations, 4.4k likes and 1m users',
    },
    {
      type: 'text',
      body: [
        'Special mention to the contributors',
        [
          { text: 'Akshaj Balaji', href: 'https://www.linkedin.com/in/%F0%9F%92%BBakshaj-balaji-274135112/' },
          ' (Frontend Dev) | ',
          { text: 'Zaid Kureshi', href: 'https://www.linkedin.com/in/imzedi/' },
          ' (Backend Dev) | ',
          { text: 'Celcea Taffini', href: 'https://www.linkedin.com/in/celcea-tifani-9a0bb137/' },
          ' (Animator)',
        ],
      ],
    },
  ],
};
