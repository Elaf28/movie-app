import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ScrollableRow({
  children,
  className = "",
  scrollAmount = 0.7,
  showButtons = true,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const amount = clientWidth * scrollAmount;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="group/list relative w-full">
      {showButtons && canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          // className="absolute -left-4 top-1/2 z-100 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-primary-foreground focus:outline-none opacity-0 group-hover/list:opacity-100 hidden md:flex cursor-pointer"
          className="bg-background/60 text-foreground hover:bg-background/90 absolute inset-y-0 -left-3 z-100 my-auto flex hidden h-4/5 max-h-24 w-12 cursor-pointer items-center justify-center rounded-2xl opacity-0 backdrop-blur-sm transition group-hover/list:opacity-100 hover:scale-105 focus:outline-none md:flex"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={`no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth ${className}`}
      >
        {children}
      </div>

      {showButtons && canScrollRight && (
        <button
          onClick={() => scroll("right")}
          // className="absolute -right-4 top-1/2 z-100 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm transition hover:bg-primary hover:text-primary-foreground focus:outline-none opacity-0 group-hover/list:opacity-100 hidden md:flex cursor-pointer"
          className="bg-background/60 text-foreground hover:bg-background/90 absolute inset-y-0 -right-3 z-100 my-auto flex hidden h-4/5 max-h-24 w-12 cursor-pointer items-center justify-center rounded-2xl opacity-0 backdrop-blur-sm transition group-hover/list:opacity-100 hover:scale-105 focus:outline-none md:flex"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
}

export default ScrollableRow;
