"use client";
import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface Category {
  id: string | number;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}

export interface CategoryListProps {
  title: string;
  subtitle?: string;
  categories: Category[];
  headerIcon?: React.ReactNode;
  className?: string;
}

export const CategoryList = ({
  title,
  subtitle,
  categories,
  headerIcon,
  className,
}: CategoryListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);

  return (
    <div className={cn("w-full bg-[#090909] text-[#F5F5F3] py-6 px-2 md:px-6", className)}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          {headerIcon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange/90 to-brand-orange mb-6 text-black shadow-[0_0_25px_rgba(255,106,0,0.3)]">
              {headerIcon}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-display font-medium mb-3 tracking-tight text-[#F5F5F3]">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-base md:text-xl font-sans font-light text-[#8E8E93] max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </h2>
          )}
        </div>

        {/* Categories List */}
        <div className="space-y-3.5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group select-none"
              onMouseEnter={() => setHoveredItem(category.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={category.onClick}
            >
              <div
                className={cn(
                  "relative overflow-hidden border bg-[#121212]/80 rounded-sm transition-all duration-300 ease-in-out cursor-pointer",
                  // Website brand theme hover state styles
                  hoveredItem === category.id
                    ? 'min-h-[110px] md:min-h-[120px] border-brand-orange shadow-lg shadow-brand-orange/20 bg-brand-orange/10'
                    : 'min-h-[85px] md:min-h-[90px] border-white/10 hover:border-brand-orange/50'
                )}
              >
                {/* Corner brackets that appear on hover */}
                {hoveredItem === category.id && (
                  <>
                    <div className="absolute top-3 left-3 w-5 h-5 pointer-events-none">
                      <div className="absolute top-0 left-0 w-3.5 h-[2px] bg-brand-orange" />
                      <div className="absolute top-0 left-0 w-[2px] h-3.5 bg-brand-orange" />
                    </div>
                    <div className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none">
                      <div className="absolute bottom-0 right-0 w-3.5 h-[2px] bg-brand-orange" />
                      <div className="absolute bottom-0 right-0 w-[2px] h-3.5 bg-brand-orange" />
                    </div>
                  </>
                )}

                {/* Content */}
                <div className="flex items-center justify-between h-full py-4 px-6 md:px-8 gap-4">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={cn(
                        "font-display font-medium transition-colors duration-300",
                        category.featured ? 'text-xl md:text-2xl' : 'text-lg md:text-xl',
                        hoveredItem === category.id ? 'text-brand-orange' : 'text-[#F5F5F3]'
                      )}
                    >
                      {category.title}
                    </h3>
                    {category.subtitle && (
                      <p
                        className={cn(
                          "mt-1.5 transition-colors duration-300 text-xs md:text-sm font-sans font-light leading-relaxed",
                           hoveredItem === category.id ? 'text-[#F5F5F3]/90' : 'text-[#8E8E93]'
                        )}
                      >
                        {category.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Icon appears on the right on hover */}
                  {category.icon && (
                    <div className={cn(
                      "text-xl md:text-2xl shrink-0 transition-all duration-300 flex items-center justify-center p-3 rounded-full border",
                      hoveredItem === category.id 
                        ? 'text-brand-orange border-brand-orange/40 bg-brand-orange/10 scale-110 opacity-100' 
                        : 'text-[#8E8E93] border-white/5 bg-white/5 opacity-70'
                    )}>
                      {category.icon}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
