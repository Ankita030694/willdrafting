"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  illustration: React.ReactNode;
}

const services: ServiceCard[] = [
  {
    title: "Online Wills",
    description: "Protect your assets, name guardians for your children, leave instructions that hold up.",
    linkText: "Write your Will",
    linkHref: "/start",
    illustration: (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[170px] max-h-[110px] h-auto mx-auto"
      >
        {/* Soft background glow */}
        <circle cx="160" cy="110" r="85" fill="#EAD5E2" fillOpacity="0.35" />
        
        {/* Body / Sweater in lavender/purple */}
        <path
          d="M125 180C120 155 128 135 150 132C172 135 180 155 175 180H125Z"
          fill="#9067C6"
          stroke="#1E1E1E"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M110 180C105 160 115 140 130 135L120 180H110Z"
          fill="#9067C6"
          stroke="#1E1E1E"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M135 133L142 150L150 133"
          stroke="#1E1E1E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Neck */}
        <path
          d="M142 120V133H158V120"
          fill="#FFDFC4"
          stroke="#1E1E1E"
          strokeWidth="2.5"
        />

        {/* Hair - Back */}
        <path
          d="M130 75C125 85 125 125 130 135C135 140 140 140 142 135C135 110 135 85 140 75H130Z"
          fill="#F26419"
          stroke="#1E1E1E"
          strokeWidth="2.5"
        />

        {/* Head */}
        <path
          d="M135 85C135 72 145 68 152 68C162 68 168 74 168 85C168 98 162 120 152 120C142 120 135 98 135 85Z"
          fill="#FFDFC4"
          stroke="#1E1E1E"
          strokeWidth="2.5"
        />

        {/* Hair - Front */}
        <path
          d="M136 78C142 70 158 66 168 76C166 70 158 65 148 65C138 65 134 72 136 78Z"
          fill="#F26419"
          stroke="#1E1E1E"
          strokeWidth="2.5"
        />

        {/* Face features */}
        <circle cx="158" cy="88" r="1.75" fill="#1E1E1E" />
        <path d="M162 95C160 97 157 97 155 96" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />

        {/* Hand holding phone to ear */}
        <path
          d="M130 115C132 105 135 98 138 95L144 98L139 120L130 115Z"
          fill="#FFDFC4"
          stroke="#1E1E1E"
          strokeWidth="2.5"
        />
        {/* Phone */}
        <rect
          x="132"
          y="85"
          width="9"
          height="20"
          rx="3"
          transform="rotate(-15 132 85)"
          fill="#FFFFFF"
          stroke="#1E1E1E"
          strokeWidth="2.5"
        />

        {/* Hand & Will Document */}
        {/* Document Sheet */}
        <g transform="translate(170, 75)">
          <rect
            x="0"
            y="0"
            width="58"
            height="80"
            rx="4"
            fill="#FFFFFF"
            stroke="#1E1E1E"
            strokeWidth="2.5"
          />
          {/* Document Header Logo / Heart Stamp */}
          <path
            d="M25 16C25 13 28 11 30 13C32 11 35 13 35 16C35 20 30 23 30 23C30 23 25 20 25 16Z"
            stroke="#C65378"
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Text lines */}
          <line x1="12" y1="32" x2="46" y2="32" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="40" x2="46" y2="40" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="48" x2="38" y2="48" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="56" x2="26" y2="56" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="56" x2="42" y2="56" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          
          {/* Hand holding document */}
          <path
            d="M-4 35C-6 32 -4 28 -1 28C2 28 4 31 4 35V45H-4V35Z"
            fill="#FFDFC4"
            stroke="#1E1E1E"
            strokeWidth="2"
          />
          <path
            d="M58 35C61 35 63 38 61 42C59 45 56 46 54 44L56 35H58Z"
            fill="#FFDFC4"
            stroke="#1E1E1E"
            strokeWidth="2"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Power of Attorney",
    description: "Appoint someone you trust to act for you if you can't. Financial, medical or personal.",
    linkText: "Arrange Power of Attorney",
    linkHref: "/start",
    illustration: (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[170px] max-h-[110px] h-auto mx-auto"
      >
        {/* Soft background glow */}
        <circle cx="160" cy="110" r="85" fill="#EAD5E2" fillOpacity="0.35" />

        {/* Stacked Legal Documents */}
        <g transform="translate(130, 45)">
          {/* Back Sheet */}
          <rect
            x="8"
            y="-4"
            width="65"
            height="90"
            rx="4"
            transform="rotate(6 8 -4)"
            fill="#F7FAFC"
            stroke="#1E1E1E"
            strokeWidth="2"
          />

          {/* Front Main Document */}
          <rect
            x="0"
            y="0"
            width="66"
            height="92"
            rx="4"
            fill="#FFFFFF"
            stroke="#1E1E1E"
            strokeWidth="2.5"
          />
          
          {/* Paperclip */}
          <path
            d="M8 -6V14C8 17 12 17 12 14V-2C12 -4 15 -4 15 -2V12"
            stroke="#1E1E1E"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Document Content lines */}
          <line x1="14" y1="18" x2="52" y2="18" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="14" y1="28" x2="52" y2="28" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="38" x2="48" y2="38" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />

          {/* Icons on document (medical cross, rupee/dollar, user) */}
          {/* Medical Plus */}
          <path d="M18 52H24M21 49V55" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          {/* Currency Symbol */}
          <text x="17" y="70" fontSize="11" fontWeight="bold" fill="#1E1E1E" fontFamily="sans-serif">₹</text>
          {/* Person silhouette */}
          <circle cx="21" cy="79" r="2.5" stroke="#1E1E1E" strokeWidth="1.5" />
          <path d="M17 86C17 83 25 83 25 86" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />

          {/* Text lines adjacent to icons */}
          <line x1="30" y1="52" x2="52" y2="52" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="67" x2="52" y2="67" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="83" x2="50" y2="83" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />

          {/* Gavel Head */}
          <g transform="translate(42, 48) rotate(-35)">
            {/* Hammer Head */}
            <rect
              x="0"
              y="0"
              width="24"
              height="36"
              rx="4"
              fill="#E07A2B"
              stroke="#1E1E1E"
              strokeWidth="2.5"
            />
            {/* Grooves on Hammer head */}
            <line x1="0" y1="7" x2="24" y2="7" stroke="#1E1E1E" strokeWidth="2" />
            <line x1="0" y1="29" x2="24" y2="29" stroke="#1E1E1E" strokeWidth="2" />

            {/* Handle */}
            <rect
              x="24"
              y="14"
              width="45"
              height="8"
              rx="3"
              fill="#E07A2B"
              stroke="#1E1E1E"
              strokeWidth="2.5"
            />
          </g>

          {/* Sound block / Base plate */}
          <rect
            x="48"
            y="94"
            width="32"
            height="7"
            rx="3.5"
            fill="#E07A2B"
            stroke="#1E1E1E"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    ),
  },
  {
    title: "Family Living Trusts",
    description: "Shield generational wealth, bypass probate court, and manage multi-asset inheritance on your terms.",
    linkText: "Explore Family Trusts",
    linkHref: "/start",
    illustration: (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[170px] max-h-[110px] h-auto mx-auto"
      >
        {/* Soft background glow */}
        <circle cx="160" cy="110" r="85" fill="#EAD5E2" fillOpacity="0.35" />

        {/* Trust Vault & Shield */}
        <g transform="translate(120, 50)">
          {/* Base Safe / Box */}
          <rect
            x="5"
            y="25"
            width="70"
            height="65"
            rx="8"
            fill="#FFFFFF"
            stroke="#1E1E1E"
            strokeWidth="2.5"
          />

          {/* Safe Door Outer Rim */}
          <circle cx="40" cy="57" r="20" fill="#F8FAFC" stroke="#1E1E1E" strokeWidth="2" />
          
          {/* Vault Wheel */}
          <circle cx="40" cy="57" r="10" fill="#9067C6" stroke="#1E1E1E" strokeWidth="2" />
          <line x1="40" y1="42" x2="40" y2="72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="25" y1="57" x2="55" y2="57" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Protective Shield at top */}
          <path
            d="M40 0L65 10V28C65 42 40 52 40 52C40 52 15 42 15 28V10L40 0Z"
            fill="#C65378"
            stroke="#1E1E1E"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Keyhole / Check in Shield */}
          <path
            d="M33 22L38 27L48 17"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Key lying next to vault */}
          <g transform="translate(68, 62) rotate(25)">
            <circle cx="8" cy="8" r="6" stroke="#E07A2B" strokeWidth="2" fill="none" />
            <path d="M14 8H26M22 8V12M25 8V11" stroke="#E07A2B" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    title: "Lawyer Review & Registration",
    description: "Have your draft inspected by verified Bar Council advocates and guided through local sub-registrar recording.",
    linkText: "Book Lawyer Consultation",
    linkHref: "/authority",
    illustration: (
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[170px] max-h-[110px] h-auto mx-auto"
      >
        {/* Soft background glow */}
        <circle cx="160" cy="110" r="85" fill="#EAD5E2" fillOpacity="0.35" />

        {/* Certificate / Lawyer Badge & Official Seal */}
        <g transform="translate(125, 45)">
          {/* Certificate Board */}
          <rect
            x="0"
            y="0"
            width="70"
            height="90"
            rx="6"
            fill="#FFFFFF"
            stroke="#1E1E1E"
            strokeWidth="2.5"
          />
          
          {/* Top Banner Ribbon */}
          <path
            d="M12 0H58V14C58 14 35 18 12 14V0Z"
            fill="#9067C6"
            stroke="#1E1E1E"
            strokeWidth="2"
          />

          {/* Document Lines */}
          <line x1="14" y1="26" x2="56" y2="26" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="34" x2="56" y2="34" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="42" x2="48" y2="42" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" />

          {/* Official Verification Seal with Ribbon */}
          <g transform="translate(35, 62)">
            {/* Ribbons hanging down */}
            <path d="M-6 8L-9 22L0 18L9 22L6 8" fill="#C65378" stroke="#1E1E1E" strokeWidth="1.5" />
            {/* Round Wax Seal */}
            <circle cx="0" cy="0" r="14" fill="#C65378" stroke="#1E1E1E" strokeWidth="2" />
            <circle cx="0" cy="0" r="10" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            {/* Star in seal */}
            <path
              d="M0 -5L1.5 -1.5H5.5L2.3 0.8L3.5 4.5L0 2.2L-3.5 4.5L-2.3 0.8L-5.5 -1.5H-1.5L0 -5Z"
              fill="#FFFFFF"
            />
          </g>

          {/* Legal Feather Quill */}
          <g transform="translate(56, 12) rotate(28)">
            <path
              d="M0 0C4 18 12 36 22 48L18 50C10 38 4 20 0 0Z"
              fill="#E07A2B"
              stroke="#1E1E1E"
              strokeWidth="1.5"
            />
            <path d="M22 48L25 54L20 51" stroke="#1E1E1E" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section className="w-full bg-[#FAF7F0] py-16 sm:py-20 flex justify-center">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 max-w-[800px]">
          {/* Eyebrow with leading rule */}
          <div className="flex items-center gap-3 mb-4 text-left">
            
            <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#C65378]">
              Estate Planning
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-[2.35rem] sm:text-[3.2rem] lg:text-[3.65rem] font-normal font-playfair font-heading text-[#172228] leading-[1.12] tracking-tight mb-5">
            Your plan, on paper.
          </h2>

          {/* Subheading / Description */}
          <p className="text-[1.05rem] sm:text-[1.15rem] leading-[1.65] text-[#49585F] font-normal max-w-[640px]">
            A legally valid Will or Power of Attorney, written from home in under twenty minutes and reviewable by WillDrafting Law.
          </p>
        </div>

        {/* 2-Card Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300  group"
            >
              {/* Top Illustration Container - Half Height */}
              <div className="w-full bg-gradient-to-b from-[#F5EBF4]/40 to-transparent py-5 px-6 flex items-center justify-center h-[130px] sm:h-[305px]">
                {service.illustration}
              </div>

              {/* Bottom Text & CTA Container - Compact Padding */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 border-t border-[#1B2A4A]/5">
                <div>
                  <h3 className="text-[1.35rem] sm:text-[1.5rem] font-bold text-[#172228] mb-1.5 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[0.90rem] sm:text-[0.95rem] leading-relaxed text-[#49585F] mb-4 max-w-[480px]">
                    {service.description}
                  </p>
                </div>

                {/* Link */}
                <div>
                  <Link
                    href={service.linkHref}
                    className="inline-flex items-center gap-1.5 text-[0.90rem] font-bold text-[#C65378] group-hover:text-[#9F3B5C] transition-colors"
                  >
                    <span>{service.linkText}</span>
                    <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
