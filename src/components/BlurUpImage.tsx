import React, { useState } from "react";

interface BlurUpImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function BlurUpImage({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  ...props
}: BlurUpImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${wrapperClassName}`}>
      {/* Blurry Low-Res / Placeholder Shimmer layer that fades out */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-[#161616] animate-pulse flex items-center justify-center"
        >
          {/* A small elegant SVG spinner or subtle pattern */}
          <div className="w-6 h-6 rounded-full border border-white/10 border-t-brand-orange animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-all duration-750 ease-out ${
          isLoaded 
            ? "blur-0 scale-100 opacity-100" 
            : "blur-md scale-105 opacity-0"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
