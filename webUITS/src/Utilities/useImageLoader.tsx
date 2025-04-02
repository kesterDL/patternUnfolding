import { useState, useEffect } from "react";

/**
 * Custom hook to load images in the background.
 * @param {string} imageSrc - The URL of the image to load.
 * @param {string} placeholder - URL or path to the placeholder image.
 * @returns {string} - The loaded image or the placeholder image.
 */
export function useImageLoader(imageSrc: string, placeholder: string) {
  const [displayedImage, setDisplayedImage] = useState(placeholder);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;

    //this doesn't make much sense to me. TODO review if these lines are needed.
    //@ts-expect-error
    img.onload = setDisplayedImage(imageSrc); // switch to desired image when loaded
    //@ts-expect-error
    img.onerror = console.error(`Failed to load image: ${imageSrc}`); // Fallback to placeholder

    // Clean up memory
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, placeholder]);

  return displayedImage;
}
