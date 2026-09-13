import React, { useRef, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Camera,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PersonPhoto } from '../types';
import { saveStoredPhoto, removeStoredPhoto } from '../utils/photoManager';

interface PhotoGalleryProps {
  photos: (string | PersonPhoto)[];
  personName: string;
  onPhotoUpdated?: () => void;
}

/**
 * Individual Photo Card that dynamically sizes itself based on the image's
 * actual natural dimensions and aspect ratio (Portrait, Landscape, Square, Tall, Wide).
 * Never crops, distorts, stretches, or forces fixed rectangular aspect ratios.
 */
interface PhotoCardProps {
  photo: PersonPhoto;
  personName: string;
  isFailed: boolean;
  isCustom: boolean;
  onEnlarge: (url: string) => void;
  onImageError: (url: string) => void;
  onOpenUpload: (slotNumber: number) => void;
  onResetPhoto: (slotNumber: number, e: React.MouseEvent) => void;
}

const PhotoGalleryCard: React.FC<PhotoCardProps> = ({
  photo,
  personName,
  isFailed,
  isCustom,
  onEnlarge,
  onImageError,
  onOpenUpload,
  onResetPhoto,
}) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // Probe natural image dimensions dynamically whenever the photo URL changes
  useEffect(() => {
    let active = true;
    if (isFailed) return;

    const img = new Image();
    img.src = photo.url;

    const captureDimensions = () => {
      if (!active) return;
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (Number.isFinite(ratio) && ratio > 0) {
          setAspectRatio(ratio);
        }
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      captureDimensions();
    } else {
      img.onload = captureDimensions;
      img.onerror = () => {
        // Handled by <img> onError
      };
    }

    return () => {
      active = false;
    };
  }, [photo.url, isFailed]);

  // Aesthetic orientation tag
  const orientationBadge = React.useMemo(() => {
    if (!aspectRatio) return null;
    if (aspectRatio > 1.6) return 'Wide';
    if (aspectRatio > 1.15) return 'Landscape';
    if (aspectRatio >= 0.88 && aspectRatio <= 1.15) return 'Square';
    if (aspectRatio < 0.65) return 'Tall';
    return 'Portrait';
  }, [aspectRatio]);

  // Dynamic card width:
  // - Adapts directly to the natural aspect ratio of the image
  // - Clamped between 190px (so action controls fit comfortably) and min(88vw, 760px) (preventing breaking layouts)
  const cardWidthStyle = React.useMemo(() => {
    if (!aspectRatio) {
      // Default fallback while loading: gentle portrait proportion
      return 'clamp(200px, calc(var(--gallery-photo-h, 380px) * 0.75), min(88vw, 760px))';
    }
    const safeRatio = Number(aspectRatio.toFixed(4));
    return `clamp(190px, calc(var(--gallery-photo-h, 380px) * ${safeRatio}), min(88vw, 760px))`;
  }, [aspectRatio]);

  return (
    <div
      className="gallery-card flex-none snap-start group flex flex-col transition-[width] duration-300 ease-out"
      style={{
        width: cardWidthStyle,
      }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#161412] border border-amber-500/25 group-hover:border-amber-400/60 transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.5)] group-hover:shadow-[0_12px_32px_rgba(245,158,11,0.2)] flex flex-col h-full">
        {/* Dynamic Aspect Photo Viewport: height driven by gallery band, width fits image */}
        <div className="relative gallery-photo-box w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
          {isFailed ? (
            /* Clear diagnostic card instead of silent fake fallback */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#120f0d] border border-red-500/30 text-amber-200">
              <AlertCircle className="w-9 h-9 text-amber-400 mb-2 opacity-80" />
              <span className="text-xs font-semibold text-amber-300 font-display uppercase tracking-wider">
                Photo Not Found
              </span>
              <code className="text-[11px] font-mono text-amber-300/90 break-all mt-2 px-2 py-1 rounded bg-black/70 border border-amber-500/30 max-w-full">
                {photo.url}
              </code>
              <p className="text-[11px] text-amber-200/60 mt-2 font-body">
                Please verify the file exists in public/
              </p>
            </div>
          ) : (
            <img
              src={photo.url}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02] cursor-pointer select-none"
              referrerPolicy="no-referrer"
              onClick={() => onEnlarge(photo.url)}
              onError={() => onImageError(photo.url)}
              onLoad={(e) => {
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth > 0 && naturalHeight > 0) {
                  const ratio = naturalWidth / naturalHeight;
                  if (Number.isFinite(ratio) && ratio > 0) {
                    setAspectRatio(ratio);
                  }
                }
              }}
            />
          )}

          {/* Vignette overlays for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
            <div className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/30 text-[11px] font-bold text-amber-200 font-display">
              #{photo.slotNumber}
            </div>
            {orientationBadge && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-amber-400/20 text-[10px] text-amber-300/80 font-mono font-medium">
                {orientationBadge}
              </span>
            )}
            {isCustom && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/85 text-black text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Custom
              </span>
            )}
          </div>

          {/* Top Right Controls: Enlarge (if not failed) */}
          {!isFailed && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
              <button
                onClick={() => onEnlarge(photo.url)}
                className="p-2 rounded-full bg-black/75 text-amber-200 hover:text-white hover:bg-amber-500 hover:scale-105 transition-all backdrop-blur-md shadow-md"
                aria-label="Enlarge photo"
                title="Enlarge photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Bottom Controls: Upload / Replace individual photo */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <button
              onClick={() => onOpenUpload(photo.slotNumber)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-black/80 hover:bg-amber-400 hover:text-black text-amber-200 border border-amber-400/40 text-[10px] sm:text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-md transition-all active:scale-95 shadow-md whitespace-nowrap"
              title={`Upload or replace photo #${photo.slotNumber}`}
            >
              <Camera className="w-3 h-3 flex-shrink-0" />
              <span>{isCustom ? 'Change' : 'Upload'}</span>
            </button>

            {isCustom && (
              <button
                onClick={(e) => onResetPhoto(photo.slotNumber, e)}
                className="p-1.5 rounded-full bg-black/80 hover:bg-red-500/80 text-amber-200 hover:text-white border border-amber-400/30 text-[11px] backdrop-blur-md transition-all shadow-md"
                title="Reset to default"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Caption Footer */}
        <div className="p-3 bg-[#181512] border-t border-amber-500/20 min-h-[50px] flex items-center justify-between">
          <p className="text-xs text-amber-200/90 font-body italic line-clamp-2">
            "{photo.caption || `${personName}'s New Year celebration memory #${photo.slotNumber}`}"
          </p>
        </div>
      </div>
    </div>
  );
};

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  personName,
  onPhotoUpdated,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeUploadSlot, setActiveUploadSlot] = useState<number | null>(null);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);
  const [failedPhotoUrls, setFailedPhotoUrls] = useState<Set<string>>(new Set());

  // Normalize photos into rich PersonPhoto format supporting any number of photos
  const normalizedPhotos: PersonPhoto[] = photos.map((item, index) => {
    if (typeof item === 'string') {
      return {
        id: `photo-${index}`,
        slotNumber: index + 1,
        url: item,
        alt: `${personName}'s New Year photo ${index + 1}`,
        caption: undefined,
      };
    }
    return {
      id: item.id || `photo-${index}`,
      slotNumber: item.slotNumber || index + 1,
      url: item.url,
      alt: item.alt || `${personName}'s New Year photo ${index + 1}`,
      caption: item.caption,
    };
  });

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [normalizedPhotos]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Scroll by roughly 65% of visible viewport width for smooth navigation across variable width cards
    const scrollAmount = direction === 'left' ? -Math.max(280, el.clientWidth * 0.65) : Math.max(280, el.clientWidth * 0.65);
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Trigger individual file selection for a given slot
  const handleOpenUpload = (slotNumber: number) => {
    setActiveUploadSlot(slotNumber);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeUploadSlot === null) return;

    // Read as Data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && activeUploadSlot !== null) {
        saveStoredPhoto(activeUploadSlot, result);
        setUploadSuccessMsg(`Updated Picture #${activeUploadSlot}!`);
        setTimeout(() => setUploadSuccessMsg(null), 3000);
        onPhotoUpdated?.();
      }
    };
    reader.readAsDataURL(file);

    // Reset input value so same file can be selected again if needed
    e.target.value = '';
  };

  const handleResetPhoto = (slotNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeStoredPhoto(slotNumber);
    setUploadSuccessMsg(`Reset Picture #${slotNumber} to default`);
    setTimeout(() => setUploadSuccessMsg(null), 3000);
    onPhotoUpdated?.();
  };

  const handleImageError = (url: string) => {
    console.error(`Photo not found: ${url}`);
    setFailedPhotoUrls((prev) => new Set(prev).add(url));
  };

  return (
    <div className="w-full relative select-none">
      {/* Hidden file input for single-photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload photo"
      />

      {/* Success notification toast */}
      {uploadSuccessMsg && (
        <div className="mb-3 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          <span>{uploadSuccessMsg}</span>
        </div>
      )}

      {/* Gallery Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-2 sm:px-4 mb-3 text-xs text-amber-300/80 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-display tracking-wide uppercase text-amber-200">
            {normalizedPhotos.length} {normalizedPhotos.length === 1 ? 'Moment' : 'Moments'}
          </span>
          {normalizedPhotos.length > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[11px] text-amber-300">
              {normalizedPhotos.length === 1
                ? 'Picture 1'
                : `Pictures 1 to ${normalizedPhotos.length}`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-amber-400/60 font-body text-[11px]">
            Swipe horizontally or use arrows
          </span>
        </div>
      </div>

      {/* Desktop navigation buttons */}
      <div className="hidden sm:block">
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-11 h-11 rounded-full bg-black/85 border border-amber-400/40 text-amber-200 flex items-center justify-center backdrop-blur-md shadow-xl hover:bg-amber-400 hover:text-black transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-11 h-11 rounded-full bg-black/85 border border-amber-400/40 text-amber-200 flex items-center justify-center backdrop-blur-md shadow-xl hover:bg-amber-400 hover:text-black transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* The Horizontal Side-Scrollable Container with Adaptive Card Dimensions */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="gallery-scroll-container flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-3 px-1 sm:px-2 snap-x snap-proximity"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {normalizedPhotos.map((photo) => (
          <PhotoGalleryCard
            key={photo.id || `slot-${photo.slotNumber}`}
            photo={photo}
            personName={personName}
            isCustom={photo.url.startsWith('data:')}
            isFailed={failedPhotoUrls.has(photo.url)}
            onEnlarge={(url) => setSelectedPhoto(url)}
            onImageError={handleImageError}
            onOpenUpload={handleOpenUpload}
            onResetPhoto={handleResetPhoto}
          />
        ))}

        {/* Spacer at the end of the scroll */}
        <div className="flex-none w-4 sm:w-8" aria-hidden="true" />
      </div>

      {/* Mobile swipe hint */}
      <div className="sm:hidden flex items-center justify-center gap-2 mt-2 text-xs text-amber-300/60 font-body">
        <span>← Swipe horizontally to view all memories →</span>
      </div>

      {/* Lightbox Modal (Full view with original aspect ratio) */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 z-50"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Expanded view"
            className="max-h-[88vh] max-w-[94vw] object-contain rounded-xl border border-amber-400/40 box-gold-glow"
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};
