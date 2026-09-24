"use client";

import React, { useRef } from "react";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  verified: boolean;
  content: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Stephen",
    rating: 5,
    verified: true,
    content: "So far excellent service and excellent communication 👍 Everything was clearly explained and handled without any stress.",
  },
  {
    id: 2,
    name: "Roy",
    rating: 5,
    verified: true,
    content: "Whatever you are paying your legal advisors it's not enough. Patient, reassuring, and thorough from the very first phone call to the final document.",
  },
  {
    id: 3,
    name: "Leanne",
    rating: 5,
    verified: true,
    content: "I recently arranged our family living will and estate planning. They were respectful, kind, and professional in dealing with every question.",
  },
  {
    id: 4,
    name: "Debbie M",
    rating: 5,
    verified: true,
    content: "Very easy to communicate with. I felt confident and reassured right from the get-go. Our documents were prepared and attested flawlessly.",
  },
  {
    id: 5,
    name: "Rajesh K",
    rating: 5,
    verified: true,
    content: "Drafted my will in less than 20 minutes online. The legal panel review gave our family total confidence under Indian succession laws.",
  },
  {
    id: 6,
    name: "Ananya S",
    rating: 5,
    verified: true,
    content: "Transparent flat fees with zero hidden charges. Highly recommend to anyone looking to secure their children's future properly.",
  },
];

export default function Testimonial() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
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

            {/* Editorial Title with Playfair Serif */}
            <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-normal font-playfair font-serif text-[#172228] leading-[1.08] tracking-tight mb-4">
              Trusted by 160,000+<br />
              Families.
            </h2>

            <p className="text-[1.02rem] sm:text-[1.12rem] text-[#55636D] leading-relaxed max-w-xl mb-6">
              Compassionate guidance and peace of mind for you and your loved ones.
            </p>

            {/* Rating Badge */}
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-bold font-serif text-[#172228] leading-none">
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

          {/* Left and Right Navigation Buttons above carousel on the right side */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous reviews"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1B2A4A]/10 bg-white hover:bg-[#FAF7F0] text-[#172228] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next reviews"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#1B2A4A]/10 bg-white hover:bg-[#FAF7F0] text-[#172228] shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            CAROUSEL WRAPPER
            ========================================================================= */}
        <div className="relative">
          {/* Horizontal Track of Cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[82vw] sm:w-[320px] lg:w-[340px] shrink-0 snap-start bg-white rounded-[26px] sm:rounded-[30px] p-7 sm:p-8 min-h-[220px] sm:min-h-[245px] flex flex-col justify-between border border-[#1B2A4A]/5 shadow-[0_4px_20px_rgba(0,0,0,0.025)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300"
              >
                <div>
                  {/* Reviewer Header: Name + 5 Black Stars */}
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h3 className="font-bold text-[#172228] text-[1.05rem]">
                      {review.name}
                    </h3>
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={13} className="fill-[#172228] text-[#172228]" />
                      ))}
                    </div>
                  </div>

                  {/* Verified Customer Status */}
                  <div className="flex items-center gap-1.5 text-xs text-[#55636D] font-medium mb-4">
                    <CheckCircle2 size={13} className="text-[#172228]" />
                    <span>Verified Customer</span>
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-[0.90rem] sm:text-[0.93rem] text-[#2D3748] leading-relaxed">
                    {review.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
