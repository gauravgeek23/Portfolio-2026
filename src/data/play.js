import vision1x from '../assets/play/vision-navigation@1x.webp';
import vision2x from '../assets/play/vision-navigation@2x.webp';
import camera1x from '../assets/play/camera-wear-os@1x.webp';
import camera2x from '../assets/play/camera-wear-os@2x.webp';
import toppr1x from '../assets/play/toppr-scanning@1x.webp';
import toppr2x from '../assets/play/toppr-scanning@2x.webp';
import nike1x from '../assets/play/nike-swipe@1x.webp';
import nike2x from '../assets/play/nike-swipe@2x.webp';
import movie1x from '../assets/play/movie-booking@1x.webp';
import movie2x from '../assets/play/movie-booking@2x.webp';
import visionVideo from '../assets/play/vision-navigation.mp4';
import cameraVideo from '../assets/play/camera-wear-os-remote.mp4';
import topprVideo from '../assets/play/toppr-scanning.mp4';
import nikeVideo from '../assets/play/nike-swipe.mp4';
import movieVideo from '../assets/play/movie-booking.mp4';

// Interaction pieces on the play tab.
// `media.video` plays muted on loop while on screen; the poster shows until it loads.
// `ratio` is the frame's width / height. `fit: 'contain'` letterboxes the video on the
// frame's dark background instead of cropping it (used for the portrait Toppr recording).
// `divider: true` draws a dashed rule after the item (as in the Figma frame).
export const playItems = [
  {
    title: 'LottieFiles Vision Navigation',
    description:
      'Led the creation of LottieFiles Apple Vision Pro App experience, owning narrative, visual direction, and execution. The app was launched and listed on the App Store, marketing campaign generating 14K impressions.',
    media: { video: visionVideo, poster: vision1x, poster2x: vision2x, ratio: 800 / 400, alt: 'LottieFiles app on Apple Vision Pro showing a grid of Lolo animations in a living room' },
    links: [
      { label: 'Discover Product', href: 'https://apps.apple.com/us/app/lottiefiles/id6477488574' },
      { label: 'Read Case study', to: '/work/lottiefiles-vision-pro' },
    ],
  },
  {
    title: 'Camera App Wear OS',
    description:
      'Designed a remote camera control experience for Wear OS, enabling users to adjust settings, switch between photo and video modes, and capture hands-free using a tripod-mounted phone.',
    media: { video: cameraVideo, poster: camera1x, poster2x: camera2x, ratio: 800 / 400, alt: 'Three Wear OS watch screens: photo mode, "Image captured" and video recording' },
    links: [{ label: 'Read Case study', to: '/work/camera-app-wear-os' }],
  },
  {
    title: 'Toppr Answr Scanning Experience',
    description:
      'Simplified the journey from capturing and cropping questions to receiving accurate, AI-powered answers in seconds.',
    media: { video: topprVideo, fit: 'contain', poster: toppr1x, poster2x: toppr2x, ratio: 800 / 520, alt: 'Toppr Answr home screen on a phone under the words Click, Scan, Solve' },
  },
  {
    title: 'Nike on swipe Interaction',
    media: { video: nikeVideo, poster: nike1x, poster2x: nike2x, ratio: 1, alt: 'Nike shoe store app with a swipeable card for the Z Sportz shoe' },
  },
  {
    title: 'Movie ticket booking journey',
    media: { video: movieVideo, poster: movie1x, poster2x: movie2x, ratio: 1, alt: 'Avengers-themed movie booking app listing Black Panther, Captain Marvel and popular films' },
    divider: true,
  },
];
