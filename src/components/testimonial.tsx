"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  verified: boolean;
  content: string;
}

const reviewsRow1: Review[] = [
  {
    id: 1,
    name: "Siddharth M.",
    rating: 5,
    verified: true,
    content: "Excellent service and communication 👍 Every step from adding our Bengaluru apartment to verifying details via OTP was clearly explained and stress-free.",
  },
  {
    id: 2,
    name: "Raghavendra P.",
    rating: 5,
    verified: true,
    content: "The legal advisors from AMA Legal Solutions were patient, reassuring, and thorough from the first consultation call to the final court-ready Will.",
  },
  {
    id: 3,
    name: "Kavita N.",
    rating: 5,
    verified: true,
    content: "I recently arranged our family Will and minor guardianship clauses online. They were respectful, kind, and professional in addressing every question.",
  },
  {
    id: 4,
    name: "Deepali K.",
    rating: 5,
    verified: true,
    content: "Very easy to follow. The 18-point legal health check caught a nominee vs. beneficiary mismatch I hadn't noticed. Prepared and attested flawlessly.",
  },
  {
    id: 5,
    name: "Rajesh K.",
    rating: 5,
    verified: true,
    content: "Drafted my Will in less than 20 minutes online. The advocate review gave our family total confidence under the Hindu Succession Act.",
  },
  {
    id: 6,
    name: "Ananya S.",
    rating: 5,
    verified: true,
    content: "Transparent flat fees with zero hidden charges. Highly recommend to any Indian family looking to secure their children's future properly.",
  },
];

const reviewsRow2: Review[] = [
  {
    id: 7,
    name: "Arvind D.",
    rating: 5,
    verified: true,
    content: "The step-by-step /start questionnaire made scheduling our Demat holdings, bank accounts, and ancestral jewellery completely straightforward.",
  },
  {
    id: 8,
    name: "Priya M.",
    rating: 5,
    verified: true,
    content: "Excellent platform! Having an experienced Bar Council advocate review every clause before signing gave us complete peace of mind.",
  },
  {
    id: 9,
    name: "Devendra T.",
    rating: 5,
    verified: true,
    content: "Clear guidance without complicated legalese. The section-by-section review and OTP lock made sure our final Will deed was 100% accurate.",
  },
  {
    id: 10,
    name: "Sunita R.",
    rating: 5,
    verified: true,
    content: "Securing our family assets used to be something we kept putting off. With WillDrafting.in, we got our Will completed and printed over a weekend.",
  },
  {
    id: 11,
    name: "Vikram S.",
    rating: 5,
    verified: true,
    content: "Affordable, quick, and backed by genuine legal practitioners at AMA Legal Solutions. Best online estate planning service in India.",
  },
  {
    id: 12,
    name: "Meenakshi W.",
    rating: 5,
    verified: true,
    content: "Compassionate, structured service. The Schedule A asset table and two-witness execution guide made registration at the Sub-Registrar effortless.",
  },
];

interface MarqueeRowProps {
  items: Review[];
  direction: "left" | "right";
  speed?: number;
  rowRef?: React.RefObject<HTMLDivElement | null>;
}

function MarqueeRow({ items, direction, speed = 0.75, rowRef }: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  // Expose containerRef to external rowRef if provided
  useEffect(() => {
    if (rowRef) {
      rowRef.current = containerRef.current;
    }
  }, [rowRef]);

  const [isHovered, setIsHovered] = useState(false);
  const setWidth = useRef(0);

  // Measure width of one complete set of cards + gap
  const updateSetWidth = useCallback(() => {
    if (firstSetRef.current) {
      // gap-5 is 20px, gap-6 is 24px (at sm breakpoint >= 640px)
      const gap = window.innerWidth >= 640 ? 24 : 20;
      setWidth.current = firstSetRef.current.offsetWidth + gap;
    }
  }, []);

  useEffect(() => {
    updateSetWidth();
    window.addEventListener("resize", updateSetWidth);
    return () => window.removeEventListener("resize", updateSetWidth);
  }, [updateSetWidth]);

  // Initial scroll position setup
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      updateSetWidth();
      const singleWidth = setWidth.current || (el.scrollWidth / 4);
      if (direction === "right") {
        el.scrollLeft = singleWidth * 2;
      } else {
        el.scrollLeft = singleWidth;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [direction, updateSetWidth]);

  // Continuous smooth auto-scrolling with seamless wrap
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const el = containerRef.current;
      if (el && !isHovered && setWidth.current > 0) {
        const sw = setWidth.current;

        if (direction === "left") {
          el.scrollLeft += speed;
          if (el.scrollLeft >= sw * 2) {
            el.scrollLeft -= sw;
          }
        } else {
          el.scrollLeft -= speed;
          if (el.scrollLeft <= sw) {
            el.scrollLeft += sw;
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed, isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className="flex overflow-x-auto scrollbar-none py-2"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="flex gap-5 sm:gap-6 shrink-0">
        {/* Set 1 (measured for exact width) */}
        <div ref={firstSetRef} className="flex gap-5 sm:gap-6 shrink-0">
          {items.map((review, idx) => (
            <ReviewCard key={`set1-${review.id}-${idx}`} review={review} />
          ))}
        </div>

        {/* Set 2 */}
        <div className="flex gap-5 sm:gap-6 shrink-0">
          {items.map((review, idx) => (
            <ReviewCard key={`set2-${review.id}-${idx}`} review={review} />
          ))}
        </div>

        {/* Set 3 */}
        <div className="flex gap-5 sm:gap-6 shrink-0">
          {items.map((review, idx) => (
            <ReviewCard key={`set3-${review.id}-${idx}`} review={review} />
          ))}
        </div>

        {/* Set 4 */}
        <div className="flex gap-5 sm:gap-6 shrink-0">
          {items.map((review, idx) => (
            <ReviewCard key={`set4-${review.id}-${idx}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[82vw] sm:w-[320px] lg:w-[340px] shrink-0 bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 min-h-[210px] sm:min-h-[235px] flex flex-col justify-between border border-[#1B2A4A]/5 shadow-[0_4px_20px_rgba(0,0,0,0.025)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.055)] transition-all duration-300 pointer-events-auto">
      <div>
        {/* Reviewer Header: Name + 5 Black Stars */}
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <h3 className="font-bold text-[#172228] text-[1.02rem]">
            {review.name}
          </h3>
          <div className="flex items-center gap-0.5">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={13} className="fill-[#172228] text-[#172228]" />
            ))}
          </div>
        </div>

        {/* Verified Customer Status */}
        <div className="flex items-center gap-1.5 text-xs text-[#55636D] font-medium mb-3.5">
          <CheckCircle2 size={13} className="text-[#172228]" />
          <span>Verified Customer</span>
        </div>

        {/* Review Quote Text */}
        <p className="text-[0.88rem] sm:text-[0.92rem] text-[#2D3748] leading-relaxed">
          {review.content}
        </p>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const scrollManual = (direction: "left" | "right") => {
    const shift = direction === "left" ? -360 : 360;
    if (row1Ref.current) {
      row1Ref.current.scrollBy({ left: shift, behavior: "smooth" });
    }
    if (row2Ref.current) {
      row2Ref.current.scrollBy({ left: -shift, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="w-full max-w-[1400px] 2xl:max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* =========================================================================
            HEADER: Eyebrow Rule, Editorial Title, Subtitle & Rating Summary + Buttons
            ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            {/* Eyebrow with leading colored rule */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#C65378]">
                What Customers Say
              </span>
            </div>

            {/* Editorial Title */}
            <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.4rem] font-bold text-[#172228] leading-[1.08] tracking-tight mb-4">
              Trusted by 160,000+<br />
              Families.
            </h2>

            <p className="text-[1.02rem] sm:text-[1.12rem] text-[#55636D] leading-relaxed max-w-xl mb-6">
              Compassionate guidance and peace of mind for you and your loved ones.
            </p>

            {/* Rating Badge */}
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-[#172228] leading-none">
                4.9
              </span>
              <div className="flex items-center gap-1 text-[#F97316]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#F97316] text-[#F97316]" />
                ))}
              </div>
              <span className="text-[0.92rem] text-[#55636D] font-medium ml-1">
                1,348 reviews
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TWO-ROW ANIMATED & DRAGGABLE CAROUSEL
            Row 1: Moves right-to-left, draggable, visible on mobile & desktop
            Row 2: Moves left-to-right, draggable, visible only on md+ desktop
            ========================================================================= */}
        <div className="relative space-y-4 sm:space-y-6 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          
          {/* Row 1: Right to Left (Visible on Mobile & Desktop) */}
          <MarqueeRow
            items={reviewsRow1}
            direction="left"
            speed={0.7}
            rowRef={row1Ref}
          />

          {/* Row 2: Left to Right (Hidden on mobile, visible on desktop/tablet md+) */}
          <div className="hidden md:block">
            <MarqueeRow
              items={reviewsRow2}
              direction="right"
              speed={0.7}
              rowRef={row2Ref}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
