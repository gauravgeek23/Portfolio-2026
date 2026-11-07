import { images } from './about-images';

export const about = {
  hero: {
    ...images.hero,
    alt: 'Gaurav with a backpack beside Pangong Lake in Ladakh, under the word "Expeditions"',
    layers: images.heroLayers,
  },
};

// Story blocks: one large photo on the left, two stacked on the right.
// `weight` sets the relative height of the two right-hand photos (Figma: 194/194 or 168/220).
export const stories = [
  {
    title: 'Project Altitude : An Expedition Saga',
    body: 'A 5,200-kilometre motorcycling expedition across Ladakh and Himachal, conquering 20+ high-altitude passes, including Umling La, across the iconic circuits of Zanskar, Nubra, Changthang, and Spiti.',
    photos: [
      {
        ...images.altitude1,
        alt: 'Holding the Indian flag beside the motorcycle at the Umling La sign, 19,024 ft',
        caption: 'Umling La',
      },
      {
        ...images.altitude2,
        alt: 'Motorcycle on an empty road through the Nubra Valley under storm clouds',
        caption: 'Nubra Valley',
        weight: 194,
      },
      {
        ...images.altitude3,
        alt: 'Standing with a monk beside the motorcycle at a lake in the Zanskar Valley',
        caption: 'Zanskar Valley',
        weight: 194,
      },
    ],
  },
  {
    title: 'An unsuccessful attempt to conquer KANG YATSE II',
    body: 'Chasing the 6,250-meter summit of Kang Yatse 2 was a journey fuelled by passion and grit. Though we stopped at 5,791 meters, the breathtaking 9-day expedition through the heart of Markha Valley left me with unforgettable memories and views that will inspire me forever.',
    photos: [
      {
        ...images.kang1,
        alt: 'Trekking group posing below the snow-capped Kang Yatse peak',
        caption: 'Crew for KANG YATSE II',
      },
      {
        ...images.kang2,
        alt: 'Sitting in a meadow of wildflowers in Markha Valley, with the word "Tranquil" over the mountains',
        caption: 'Markha Village',
        weight: 194,
      },
      {
        ...images.kang3,
        alt: 'Snow-covered red tents at a high-altitude campsite',
        caption: 'Kang Yatse Base camp',
        weight: 194,
      },
    ],
  },
  {
    title: 'EVEREST BASE CAMP a dream come true',
    body: 'Embarking on a high-altitude expedition to Everest Base Camp was a transformative journey through the majestic Sagarmatha . Over 14 days, I pushed my limits, embraced the humility of the mountains, and gained a profound respect for the strength and serenity of nature.',
    photos: [
      {
        ...images.ebc1,
        alt: 'Holding the Indian flag at the Everest Base Camp 5364 m rock',
        caption: 'Everest Base camp',
      },
      {
        ...images.ebc2,
        alt: 'Everest, Lhotse, Makalu, Cho Oyu and Annapurna I with their heights',
        caption: 'The 5 Peaks',
        weight: 168,
      },
      {
        ...images.ebc3,
        alt: 'Three children walking along a stone wall in a Khumbu village',
        caption: 'Lukla village',
        weight: 220,
      },
    ],
  },
  {
    title: 'Longest 72 DAYS of Nomad Backpacking',
    body: 'In the summer of 2023, after completing my Everest Base Camp trek, I embarked on a 72-day solo backpacking adventure, traveling internationally for the first time with just my backpack and laptop.',
    photos: [
      { ...images.nomad1, alt: 'Petronas Towers lit up at night', caption: 'Kuala Lumpur' },
      {
        ...images.nomad2,
        alt: 'Street mural on a brick wall in George Town',
        caption: 'Murals of Penang',
        weight: 194,
      },
      { ...images.nomad3, alt: 'Islands on a calm sea under a cloudy sky', caption: 'Langkawi', weight: 194 },
    ],
  },
  {
    title: 'Talks and mentorship',
    body: "Grateful to deliver 10+ talks on how motion is bending the tech landscape, I've enjoyed sharing my knowledge with design community. Each session has been a great opportunity to connect and learn.",
    photos: [
      {
        ...images.talks1,
        alt: 'Group photo of participants outside the venue',
        caption: 'Speaker and Judge at Delhi Designathon',
      },
      { ...images.talks2, alt: 'Speaking in front of a Q&A slide', caption: 'Design meet up at Zeta', weight: 168 },
      {
        ...images.talks3,
        alt: 'Presenting a talk titled "Motion Improves Engagement" on stage',
        caption: 'Design Spark in Gujarat',
        weight: 220,
      },
    ],
  },
];

// The photo bento (About, "Photos and captures"): full-size originals, each placed in a named
// grid area (About.css, .about__bento). Ladakh leads; `pos` nudges the crop where a tile cuts in.
const bento = import.meta.glob('../assets/about/bento/*.webp', { eager: true, import: 'default' });
const shot = (name) => ({
  src: bento[`../assets/about/bento/${name}@1x.webp`],
  src2x: bento[`../assets/about/bento/${name}@2x.webp`],
});

export const photos = [
  {
    ...shot('nubra'),
    area: 'nubra',
    alt: 'Motorcycle on an empty road through the Nubra Valley under storm clouds',
    caption: 'Nubra Valley',
  },
  {
    ...shot('yak'),
    area: 'yak',
    alt: 'Yak grazing in front of snow-capped mountains in Markha Valley',
    caption: 'Markha Valley',
  },
  {
    ...shot('chemrey'),
    area: 'chemrey',
    alt: 'Chemrey Monastery rising over a hillside in Ladakh',
    caption: 'Chemrey Monastery',
  },
  {
    ...shot('milky-way'),
    area: 'milky',
    alt: 'The Milky Way over a dark ridge above Turtuk',
    caption: 'Milky Way over Turtuk',
  },
  {
    ...shot('kang-yatse'),
    area: 'kang',
    alt: 'Snow-streaked peaks above red tents at the Kang Yatse base camp',
    caption: 'Kang Yatse base camp',
  },
  { ...shot('heron'), area: 'heron', alt: 'Heron walking along a wooden jetty', caption: 'Langkawi' },
  {
    ...shot('puducherry'),
    area: 'pondy',
    alt: 'Crow taking off between palm trees and a blue-and-white beach house',
    caption: 'Puducherry',
  },
  {
    ...shot('malacca'),
    area: 'malacca',
    alt: 'Bay with islands seen over a tropical forest',
    caption: 'Strait of Malacca',
  },
  {
    ...shot('mysuru'),
    area: 'mysuru',
    alt: 'Palm trees in a green paddy field under storm clouds',
    caption: 'Mysuru',
  },
  { ...shot('ooty'), area: 'ooty', alt: 'Small tiled hut on a green hillside', caption: 'Ooty' },
  {
    ...shot('langkawi'),
    area: 'langkawi',
    alt: 'Boat passing Kilim Geoforest Park on turquoise water',
    caption: 'Kilim, Langkawi',
  },
];
