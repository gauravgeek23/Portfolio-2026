import hero1x from '../assets/about/hero@1x.webp';
import hero2x from '../assets/about/hero@2x.webp';
import heroBack1x from '../assets/about/hero-back@1x.webp';
import heroBack2x from '../assets/about/hero-back@2x.webp';
import heroText1x from '../assets/about/hero-text@1x.webp';
import heroText2x from '../assets/about/hero-text@2x.webp';
import heroFront1x from '../assets/about/hero-front@1x.webp';
import heroFront2x from '../assets/about/hero-front@2x.webp';
import altitude11x from '../assets/about/altitude-1@1x.webp';
import altitude12x from '../assets/about/altitude-1@2x.webp';
import altitude21x from '../assets/about/altitude-2@1x.webp';
import altitude22x from '../assets/about/altitude-2@2x.webp';
import altitude31x from '../assets/about/altitude-3@1x.webp';
import altitude32x from '../assets/about/altitude-3@2x.webp';
import kang11x from '../assets/about/kang-1@1x.webp';
import kang12x from '../assets/about/kang-1@2x.webp';
import kang21x from '../assets/about/kang-2@1x.webp';
import kang22x from '../assets/about/kang-2@2x.webp';
import kang31x from '../assets/about/kang-3@1x.webp';
import kang32x from '../assets/about/kang-3@2x.webp';
import ebc11x from '../assets/about/ebc-1@1x.webp';
import ebc12x from '../assets/about/ebc-1@2x.webp';
import ebc21x from '../assets/about/ebc-2@1x.webp';
import ebc22x from '../assets/about/ebc-2@2x.webp';
import ebc31x from '../assets/about/ebc-3@1x.webp';
import ebc32x from '../assets/about/ebc-3@2x.webp';
import nomad11x from '../assets/about/nomad-1@1x.webp';
import nomad12x from '../assets/about/nomad-1@2x.webp';
import nomad21x from '../assets/about/nomad-2@1x.webp';
import nomad22x from '../assets/about/nomad-2@2x.webp';
import nomad31x from '../assets/about/nomad-3@1x.webp';
import nomad32x from '../assets/about/nomad-3@2x.webp';
import talks11x from '../assets/about/talks-1@1x.webp';
import talks12x from '../assets/about/talks-1@2x.webp';
import talks21x from '../assets/about/talks-2@1x.webp';
import talks22x from '../assets/about/talks-2@2x.webp';
import talks31x from '../assets/about/talks-3@1x.webp';
import talks32x from '../assets/about/talks-3@2x.webp';
import photo11x from '../assets/about/photo-1@1x.webp';
import photo12x from '../assets/about/photo-1@2x.webp';
import photo21x from '../assets/about/photo-2@1x.webp';
import photo22x from '../assets/about/photo-2@2x.webp';
import photo31x from '../assets/about/photo-3@1x.webp';
import photo32x from '../assets/about/photo-3@2x.webp';
import photo41x from '../assets/about/photo-4@1x.webp';
import photo42x from '../assets/about/photo-4@2x.webp';
import photo51x from '../assets/about/photo-5@1x.webp';
import photo52x from '../assets/about/photo-5@2x.webp';
import photo61x from '../assets/about/photo-6@1x.webp';
import photo62x from '../assets/about/photo-6@2x.webp';
import photo71x from '../assets/about/photo-7@1x.webp';
import photo72x from '../assets/about/photo-7@2x.webp';
import photo81x from '../assets/about/photo-8@1x.webp';
import photo82x from '../assets/about/photo-8@2x.webp';
import photo91x from '../assets/about/photo-9@1x.webp';
import photo92x from '../assets/about/photo-9@2x.webp';
import photo101x from '../assets/about/photo-10@1x.webp';
import photo102x from '../assets/about/photo-10@2x.webp';

const img = (src1x, src2x) => ({ src: src1x, src2x });

export const images = {
  hero: img(hero1x, hero2x),
  // The hero split into its Figma layers (sky, title, mountains + me) for the hover effect.
  heroLayers: {
    back: img(heroBack1x, heroBack2x),
    text: img(heroText1x, heroText2x),
    front: img(heroFront1x, heroFront2x),
  },
  altitude1: img(altitude11x, altitude12x),
  altitude2: img(altitude21x, altitude22x),
  altitude3: img(altitude31x, altitude32x),
  kang1: img(kang11x, kang12x),
  kang2: img(kang21x, kang22x),
  kang3: img(kang31x, kang32x),
  ebc1: img(ebc11x, ebc12x),
  ebc2: img(ebc21x, ebc22x),
  ebc3: img(ebc31x, ebc32x),
  nomad1: img(nomad11x, nomad12x),
  nomad2: img(nomad21x, nomad22x),
  nomad3: img(nomad31x, nomad32x),
  talks1: img(talks11x, talks12x),
  talks2: img(talks21x, talks22x),
  talks3: img(talks31x, talks32x),
  photo1: img(photo11x, photo12x),
  photo2: img(photo21x, photo22x),
  photo3: img(photo31x, photo32x),
  photo4: img(photo41x, photo42x),
  photo5: img(photo51x, photo52x),
  photo6: img(photo61x, photo62x),
  photo7: img(photo71x, photo72x),
  photo8: img(photo81x, photo82x),
  photo9: img(photo91x, photo92x),
  photo10: img(photo101x, photo102x),
};
