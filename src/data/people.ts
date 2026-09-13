import { PersonPhoto, PersonProfile, UserPhotoConfig } from '../types';
import { getStoredPhotos } from '../utils/photoManager';

/**
 * =====================================================================
 * MASTER USER & PHOTO CONFIGURATION
 * =====================================================================
 * 
 * 1. TO ADD A PHOTO FOR A PERSON:
 *    Simply add the photo path to that person's `photos` array below.
 *    For example:
 *      photos: [
 *        "/images/users/hana/hana1.jpg",
 *        "/images/users/hana/hana2.jpg",
 *        "/images/users/hana/hana3.jpg"
 *      ]
 * 
 * 2. TO ADD A NEW PERSON:
 *    Add a new entry with `name` and their `photos` array below.
 *    For example:
 *      {
 *        name: "Dawit",
 *        photos: [
 *          "/images/users/dawit/dawit1.jpg",
 *          "/images/users/dawit/dawit2.jpg"
 *        ]
 *      }
 *    The new person will IMMEDIATELY be recognized by the Join system!
 * 
 * 3. CASE-INSENSITIVITY & DUPLICATE PROTECTION:
 *    Name matching is case-insensitive. If "Hana" and "HANA" are added,
 *    they are automatically merged into one record with all photos combined.
 * 
 * 4. VARIABLE PHOTO COUNTS:
 *    Any number of photos (1, 2, 5, 10+) is automatically supported.
 * =====================================================================
 */

export const USERS_CONFIG: UserPhotoConfig[] = [
  {
    name: 'Hana & Dave',
    aliases: [
      'hana & dave',
      'hana and dave',
      'hana',
      'dave',
      'hanna & dave',
      'hanna and dave',
      'hanna',
      'davit',
      'dawit',
      'dave & hana',
      'dave and hana',
      'ሃና እና ዴቭ',
      'ሃና',
      'ዴቭ',
    ],
    photos: [
      '/images/users/hana/hana1.jpg',
      '/images/users/hana/hana2.jpg',
      '/images/users/hana/hana3.jpg',
      '/images/users/hana/hana4.jpg',
      '/images/users/hana/hana5.jpg',
      '/images/users/hana/hana6.jpg',
      '/images/users/hana/hana7.jpg',
      '/images/users/hana/hana8.jpg',
      '/images/users/hana/hana9.jpg',
      '/images/users/hana/hana10.jpg',
      '/images/users/hana/hana11.jpg',
    ],
    photoRange: {
      start: 1,
      end: 11,
      count: 11,
      label: 'Pictures 1 to 11',
    },
    subtitle: 'Two beautiful souls, countless radiant smiles, and a journey filled with love',
    description: 'May 2019 bring you endless joy, togetherness, and every blessing you ever wished for.',
    additionalMessage: 'እንኳን ለአዲሱ 2019 ዓ.ም በሰላም አደረሳችሁ! ዘመኑ የፍቅር፣ የሰላምና የበረከት ይሁንላችሁ።',
    decorativeTag: '11 Cherished Moments',
  },
  {
    name: 'Samku',
    aliases: [
      'samku',
      'sam',
      'samuel',
      'sami',
      'sammy',
      'ሳምኩ',
      'ሳም',
      'ሳሙኤል',
    ],
    photos: [
      '/images/users/samku/samku1.jpg',
      '/images/users/samku/samku2.jpg',
      '/images/users/samku/samku3.jpg',
      '/images/users/samku/samku4.jpg',
      '/images/users/samku/samku5.jpg',
      '/images/users/samku/samku6.jpg',
      '/images/users/samku/samku7.jpg',
      '/images/users/samku/samku8.jpg',
      '/images/users/samku/samku9.jpg',
    ],
    photoRange: {
      start: 12,
      end: 20,
      count: 9,
      label: 'Pictures 12 to 20',
    },
    subtitle: 'A loyal heart, pure laughter, and a spark of warmth to all',
    description: 'Wishing you strength, abundant success, and golden horizons in 2019.',
    additionalMessage: 'እንኳን ለ2019 አዲስ ዓመት በሰላም አደረሰህ ሳምኩ! የደስታና የስኬት ዘመን ይሁንልህ።',
    decorativeTag: '9 Golden Memories',
  },
  {
    name: 'Meku',
    aliases: [
      'meku',
      'meklit',
      'mekdes',
      'meki',
      'መኩ',
      'መክሊት',
      'መክደስ',
    ],
    photos: [
      '/images/users/meku/meku1.jpg',
      '/images/users/meku/meku2.jpg',
      '/images/users/meku/meku3.jpg',
      '/images/users/meku/meku4.jpg',
      '/images/users/meku/meku5.jpg',
      '/images/users/meku/meku6.jpg',
      '/images/users/meku/meku7.jpg',
      '/images/users/meku/meku8.jpg',
      '/images/users/meku/meku9.jpg',
      '/images/users/meku/meku10.jpg',
      '/images/users/meku/meku11.jpg',
    ],
    photoRange: {
      start: 21,
      end: 31,
      count: 11,
      label: 'Pictures 21 to 31',
    },
    subtitle: 'Grace, radiant kindness, and a smile that lights up every room',
    description: 'May this sacred new year bring you peace, good health, and sweet surprises.',
    additionalMessage: 'መልካም አዲስ ዓመት መኩ! ዘመኑ የሰላም፣ የፍቅርና የምኞትሽ ሁሉ መሳኪያ ይሁንልሽ።',
    decorativeTag: '11 Radiant Moments',
  },
  {
    name: 'Mama',
    aliases: [
      'mama',
      'mom',
      'mother',
      'mommy',
      'እማዬ',
      'እማ',
      'ማማ',
      'ማዘር',
      'እናት',
    ],
    photos: [
      '/images/users/mama/mama1.jpg',
      '/images/users/mama/mama2.jpg',
      '/images/users/mama/mama3.jpg',
      '/images/users/mama/mama4.jpg',
      '/images/users/mama/mama5.jpg',
      '/images/users/mama/mama6.jpg',
      '/images/users/mama/mama7.jpg',
      '/images/users/mama/mama8.jpg',
      '/images/users/mama/mama9.jpg',
      '/images/users/mama/mama10.jpg',
      '/images/users/mama/mama11.jpg',
    ],
    photoRange: {
      start: 32,
      end: 42,
      count: 11,
      label: 'Pictures 32 to Last',
    },
    subtitle: 'The eternal blessing of our home, unmatched warmth, and unconditional love',
    description: 'May God grant you radiant health, peaceful days, and boundless joy in 2019.',
    additionalMessage: 'ውድ እማዬ፣ እንኳን ለአዲሱ 2019 ዓ.ም በሰላም አደረሰሽ! ፈጣሪ እድሜሽንና ጤናሽን ይባርክልን።',
    decorativeTag: 'Cherished Family Pillar',
  },
];

/**
 * Normalizes user configurations:
 * - Case-insensitive merging of people with identical names (e.g. Hana and HANA)
 * - Resolves all photo paths
 * - Connects custom browser photo overrides safely
 */
export function buildPeopleConfig(): PersonProfile[] {
  const storedPhotos = getStoredPhotos();
  const mergedMap = new Map<string, PersonProfile>();

  let globalSlotCounter = 1;

  for (const entry of USERS_CONFIG) {
    const rawName = entry.name.trim();
    if (!rawName) continue;

    const key = rawName.toLowerCase();
    let existing = mergedMap.get(key);

    // If not direct key match, check if incoming name or aliases match an existing person or their aliases
    if (!existing) {
      for (const profile of mergedMap.values()) {
        const pNameLower = profile.name.toLowerCase();
        const incomingAliases = (entry.aliases || []).map((a) => a.trim().toLowerCase());
        const hasMatchingAlias =
          profile.aliases?.includes(key) ||
          incomingAliases.includes(pNameLower) ||
          (profile.aliases && incomingAliases.some((a) => profile.aliases?.includes(a)));

        if (hasMatchingAlias) {
          existing = profile;
          break;
        }
      }
    }

    // Merge photos avoiding exact duplicate paths
    const incomingPhotos = (entry.photos || []).map((p) => p.trim()).filter(Boolean);

    if (existing) {
      // Append any new photos that aren't already in the profile
      const currentUrls = new Set(
        existing.photos.map((item) => (typeof item === 'string' ? item : item.url))
      );

      for (const newUrl of incomingPhotos) {
        if (!currentUrls.has(newUrl)) {
          const slotNum = existing.photos.length + 1;
          const customOverride = storedPhotos[slotNum];

          const photoObj: PersonPhoto = {
            id: `${existing.id}-photo-${slotNum}`,
            slotNumber: slotNum,
            url: customOverride || newUrl,
            alt: `${existing.name} - Photo ${slotNum}`,
          };
          existing.photos.push(photoObj);
        }
      }

      // Merge aliases
      if (entry.aliases) {
        existing.aliases = Array.from(
          new Set([...(existing.aliases || []), ...entry.aliases.map((a) => a.trim().toLowerCase())])
        );
      }

      // Update range count
      if (existing.photoRange) {
        existing.photoRange.count = existing.photos.length;
        existing.photoRange.end = (existing.photoRange.start || 1) + existing.photos.length - 1;
      }
    } else {
      const personId = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const startSlot = entry.photoRange?.start || globalSlotCounter;

      const profilePhotos: PersonPhoto[] = incomingPhotos.map((photoPath, idx) => {
        const slotNum = startSlot + idx;
        const customOverride = storedPhotos[slotNum];

        return {
          id: `${personId}-photo-${slotNum}`,
          slotNumber: slotNum,
          url: customOverride || photoPath,
          alt: `${rawName} - Photo ${idx + 1}`,
        };
      });

      globalSlotCounter += Math.max(1, profilePhotos.length);

      const aliasesList = (entry.aliases || []).map((a) => a.trim().toLowerCase());
      if (!aliasesList.includes(key)) {
        aliasesList.push(key);
      }

      const totalCount = profilePhotos.length;
      const endSlot = entry.photoRange?.end || (startSlot + Math.max(0, totalCount - 1));

      const newProfile: PersonProfile = {
        id: personId,
        name: rawName,
        displayName: rawName,
        aliases: aliasesList,
        photoRange: {
          start: startSlot,
          end: endSlot,
          count: totalCount,
          label: entry.photoRange?.label || `${totalCount} ${totalCount === 1 ? 'Memory' : 'Memories'}`,
        },
        photos: profilePhotos,
        subtitle: entry.subtitle || 'Cherished memories and warm celebrations for 2019',
        description: entry.description || 'May this Ethiopian New Year bring light, happiness, and peace.',
        additionalMessage: entry.additionalMessage,
        decorativeTag: entry.decorativeTag || `${totalCount} Photos`,
      };

      mergedMap.set(key, newProfile);
    }
  }

  return Array.from(mergedMap.values());
}

export let PEOPLE_CONFIG: PersonProfile[] = buildPeopleConfig();

export function refreshPeopleConfig(): PersonProfile[] {
  PEOPLE_CONFIG = buildPeopleConfig();
  return PEOPLE_CONFIG;
}

/**
 * Look up a person by name:
 * - Trims leading/trailing whitespace
 * - Performs case-insensitive matching
 * - Supports aliases and ampersand variations
 */
export function findPersonByName(inputName: string): PersonProfile | null {
  const raw = inputName.trim();
  if (!raw) return null;

  const normalized = raw.toLowerCase();
  const simplified = normalized
    .replace(/\band\b/g, '&')
    .replace(/\s*\+\s*/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  const currentProfiles = buildPeopleConfig();

  // 1. Direct name match
  for (const person of currentProfiles) {
    const personNameNorm = person.name.trim().toLowerCase();
    const personSimp = personNameNorm.replace(/\band\b/g, '&').replace(/\s+/g, ' ').trim();

    if (personNameNorm === normalized || personSimp === simplified) {
      return person;
    }

    if (person.aliases && Array.isArray(person.aliases)) {
      const aliasMatch = person.aliases.some((alias) => {
        const aNorm = alias.trim().toLowerCase();
        const aSimp = aNorm.replace(/\band\b/g, '&').replace(/\s+/g, ' ').trim();
        return aNorm === normalized || aSimp === simplified;
      });

      if (aliasMatch) {
        return person;
      }
    }
  }

  // 2. Partial / word match (e.g. typing "Hana" matches "Hana & Dave")
  const partial = currentProfiles.find((person) => {
    const pName = person.name.toLowerCase();
    const pSimp = pName.replace(/\band\b/g, '&').replace(/\s+/g, ' ').trim();
    return (
      pName.includes(normalized) ||
      normalized.includes(pName) ||
      pSimp.includes(simplified) ||
      simplified.includes(pSimp)
    );
  });

  return partial || null;
}
