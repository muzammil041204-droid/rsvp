import { useCallback, useState } from "react";
import { image } from "../lib/images";

/**
 * Lazy-loaded photo with a blurred placeholder that dissolves once the full
 * image arrives. Width/height are always set, so nothing shifts on load.
 */
export function Photo({ name, alt, className = "", imgClassName = "", priority = false, imgStyle }) {
  const { src, width, height, placeholder } = image(name);
  const [loaded, setLoaded] = useState(false);

  // Cached images can finish before React attaches onLoad
  const ref = useCallback((el) => {
    if (el?.complete && el.naturalWidth) setLoaded(true);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 size-full scale-110 object-cover blur-xl transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
      />
      <img
        ref={ref}
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        style={imgStyle}
        className={`relative size-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
