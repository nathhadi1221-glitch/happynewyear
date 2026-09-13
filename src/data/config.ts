import { CelebrationPackage } from '../types';

export const APP_CONFIG = {
  year: '2019',
  eraTransition: 'ከዘመነ ማርቆስ ወደ ዘመነ ሉቃስ',
  amharicGreeting1: 'እንኳን ለአዲስ አመት በሰላም አደረሳችሁ',
  amharicGreeting2: 'ከዘመነ ማርቆስ ወደ ዘመነ ሉቃስ በሰላም አሸጋገራችሁ',
  // Exactly requested New Year messages
  newYearMessage1:
    'let the 2019 you be beautiful as you bright as your smile and have everything you ever wanted and wished for',
  newYearMessage2:
    'Let this year be the one where we gather, laugh until it hurts, and recreate our favorite moments—while leaving plenty of blank pages for the kind of magic we haven\'t even found the words for yet.',
  // Closing wish & signature
  finalWish: 'Wish you all the best.',
  signature: 'From your beloved Nati',
  telebirr: {
    recipientName: 'Nathan',
    phoneNumber: '0994669500',
  },
  memories: {
    title: 'GLIMPSE INTO OUR MEMORIES',
    subtitle: 'Moments from the journey that brought us here, etched in golden light.',
  },
};

export const CELEBRATION_PACKAGES: CelebrationPackage[] = [
  {
    id: 'silver',
    name: 'SILVER',
    priceRange: '100–200 Birr',
    badge: '🥈',
    buttonText: 'CHOOSE SILVER',
    accent: 'silver',
    highlightText: 'A cherished gesture of blessing',
  },
  {
    id: 'gold',
    name: 'GOLD',
    priceRange: '200–300 Birr',
    badge: '🥇',
    buttonText: 'CHOOSE GOLD',
    accent: 'gold',
    highlightText: 'The golden patron of 2019',
  },
  {
    id: 'platinum',
    name: 'PLATINUM',
    priceRange: 'Greater than 300 Birr',
    badge: '💎',
    buttonText: 'CHOOSE PLATINUM',
    accent: 'platinum',
    highlightText: 'A radiant blessing for the new dawn',
  },
];
