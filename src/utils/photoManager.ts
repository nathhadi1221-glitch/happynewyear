import { PersonPhoto } from '../types';

const STORAGE_KEY = 'ethiopian_new_year_custom_photos_v1';

/**
 * Retrieve custom uploaded photo overrides from browser storage
 */
export function getStoredPhotos(): Record<number, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Save an uploaded photo for a specific slot number
 */
export function saveStoredPhoto(slotNumber: number, dataUrl: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredPhotos();
    current[slotNumber] = dataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('photos-updated', { detail: { slotNumber } }));
  } catch (err) {
    console.warn('Could not save photo to storage:', err);
  }
}

/**
 * Remove a custom uploaded photo for a specific slot
 */
export function removeStoredPhoto(slotNumber: number): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredPhotos();
    delete current[slotNumber];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('photos-updated', { detail: { slotNumber } }));
  } catch (err) {
    console.warn('Could not remove photo:', err);
  }
}
