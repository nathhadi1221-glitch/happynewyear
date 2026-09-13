export interface PersonPhoto {
  id?: string;
  url: string;
  fallbackUrl?: string;
  slotNumber: number;
  caption?: string;
  alt?: string;
}

export interface PersonProfile {
  id?: string;
  name: string;
  displayName?: string;
  aliases?: string[];
  photoRange?: {
    start: number;
    end: number;
    count: number;
    label: string;
  };
  photos: (string | PersonPhoto)[];
  subtitle?: string;
  description?: string;
  additionalMessage?: string;
  decorativeTag?: string;
}

// UserPhotoConfig for single-source user and photo registration
export interface UserPhotoConfig {
  name: string;
  photos: string[];
  aliases?: string[];
  subtitle?: string;
  description?: string;
  additionalMessage?: string;
  decorativeTag?: string;
  photoRange?: {
    start: number;
    end: number;
    count: number;
    label: string;
  };
}

// UserProfile alias for clean user system structure
export type UserProfile = PersonProfile;

export type PackageId = 'silver' | 'gold' | 'platinum';

export interface CelebrationPackage {
  id: PackageId;
  name: string;
  priceRange: string;
  badge: string;
  buttonText: string;
  accent: 'silver' | 'gold' | 'platinum';
  highlightText?: string;
}
