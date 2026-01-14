"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardMetric {
  value: string;
  label: string;
}

export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  industry: string;
  highlight: string;
  challenge: string;
  solution: string;
  metrics: CardMetric[];
  imgSrc: string;
  icon: React.ReactNode;
  color: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex
  );

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl gap-2",
        "grid",
        "h-[700px] md:h-[550px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className
      )}
      style={{
        ...gridStyle,
        ...(isDesktop
          ? { gridTemplateRows: "1fr" }
          : { gridTemplateColumns: "1fr" }),
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card text-card-foreground shadow-lg",
            "md:min-w-[60px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 group-data-[active=true]:brightness-100 scale-105 grayscale-[50%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 group-data-[active=true]:from-black/90 group-data-[active=true]:via-black/50 group-data-[active=true]:to-black/20 transition-all duration-500" />

          <article className="absolute inset-0 flex flex-col justify-end p-5 overflow-hidden">
            {/* Rotated title when collapsed (desktop only) */}
            <h3 className="absolute bottom-5 left-5 hidden origin-bottom-left -rotate-90 text-sm font-bold uppercase tracking-wider text-white opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0 whitespace-nowrap drop-shadow-lg">
              {item.title}
            </h3>

            {/* Expanded Content */}
            <div className="opacity-0 transition-all duration-300 ease-out group-data-[active=true]:opacity-100 flex flex-col gap-3">
              {/* Industry Badge */}
              <span className={cn(
                "self-start text-xs font-bold uppercase tracking-wider px-2 py-1 rounded",
                item.color
              )}>
                {item.industry}
              </span>

              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <div className="text-white/90">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60">{item.subtitle}</p>
                </div>
              </div>

              {/* Stats Grid - Always Prominent */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-white">
                      {metric.value}
                    </p>
                    <p className="text-xs text-white/50 font-medium">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Highlight Badge */}
              <div className="flex items-center gap-2">
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-sm font-bold text-white",
                  item.color
                )}>
                  {item.highlight}
                </span>
              </div>

              {/* Challenge & Solution - Scrollable on mobile */}
              <div className="space-y-2 max-h-[120px] md:max-h-[140px] overflow-y-auto pr-2 scrollbar-thin">
                <div>
                  <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Challenge</p>
                  <p className="text-sm text-white/70 leading-relaxed">{item.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/80 uppercase tracking-wider">Solution</p>
                  <p className="text-sm text-white/70 leading-relaxed">{item.solution}</p>
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
});

ExpandingCards.displayName = "ExpandingCards";
