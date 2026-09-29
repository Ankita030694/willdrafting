"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/faq";
import { Star, Loader2, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    whenDidItHappen: "",
    whatHappened: "",
    agreeDisclaimer: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setErrorMessage("Please provide either your phone number or email address.");
      return;
    }
    if (!formData.agreeDisclaimer) {
      setErrorMessage("Please acknowledge the disclaimer before sending.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#172228]">
      <Navbar />

      <main className="flex-1 w-full max-w-8xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-14 pb-20 mt-25">
        {/* Page Top Heading */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-4xl sm:text-5xl lg:text-[4.25rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#111827]"
            style={{
              fontFamily: "Georgia, 'Times New Roman', Cambria, serif",
            }}
          >
            Tell us what happened.
          </h1>
        </div>

        {/* Main Grid: Left Column (Text) & Right Column (Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
          {/* Mobile Introduction Heading (Visible on Mobile only, above form) */}
          <div className="block lg:hidden">
            <h2
              className="text-2xl sm:text-3xl font-normal leading-[1.22] tracking-[-0.015em] text-[#111827] mb-2"
              style={{
                fontFamily: "Georgia, 'Times New Roman', Cambria, serif",
              }}
            >
              There is no wrong way to start this. Tell us roughly what happened and we will
              take it from there.
            </h2>
          </div>

          {/* Form Column: order-1 on mobile (UP), order-2 on lg+ (RIGHT) */}
          <div className="lg:col-span-6 lg:pl-4 order-1 lg:order-2">
            {isSubmitted ? (
              <div className="bg-[#FAF7F0] border border-[#E4DEC9] rounded-xl p-8 sm:p-10 text-center animate-fade-in">
                <div className="w-14 h-14 bg-[#204031] text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#111827] mb-3"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', Cambria, serif",
                  }}
                >
                  Thank you for reaching out.
                </h3>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-6">
                  We have received your message. One of our specialists will review your note
                  and reach back out via phone or email the same working day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      whenDidItHappen: "",
                      whatHappened: "",
                      agreeDisclaimer: false,
                    });
                  }}
                  className="inline-flex items-center justify-center bg-[#204031] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#173024] transition-all"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-7 sm:space-y-8">
                {/* Row 1: Name and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
                  {/* Your Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=""
                      required
                      className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=""
                      className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] outline-none transition-colors"
                  />
                </div>

                {/* Row 3: When Did It Happen */}
                <div className="flex flex-col">
                  <label
                    htmlFor="whenDidItHappen"
                    className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
                  >
                    When Did It Happen
                  </label>
                  <input
                    id="whenDidItHappen"
                    name="whenDidItHappen"
                    type="text"
                    value={formData.whenDidItHappen}
                    onChange={handleChange}
                    placeholder="e.g. three weeks ago"
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors"
                  />
                </div>

                {/* Row 4: What Happened */}
                <div className="flex flex-col">
                  <label
                    htmlFor="whatHappened"
                    className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
                  >
                    What Happened
                  </label>
                  <textarea
                    id="whatHappened"
                    name="whatHappened"
                    rows={3}
                    value={formData.whatHappened}
                    onChange={handleChange}
                    placeholder="A sentence or two is enough."
                    className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors resize-none"
                  />
                </div>

                {/* Row 5: Checkbox Disclaimer */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      name="agreeDisclaimer"
                      checked={formData.agreeDisclaimer}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 rounded border-[#D1D5DB] text-[#204031] focus:ring-[#204031] cursor-pointer"
                    />
                    <span className="text-[13px] text-[#6B7280] leading-snug group-hover:text-[#4B5563] transition-colors">
                      I understand that sending this does not create an attorney-client relationship.
                    </span>
                  </label>
                </div>

                {/* Error Banner if any */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Row 6: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center bg-[#C65378] text-white px-8 py-3.5 rounded-full font-medium text-[15px] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send this to us"
                    )}
                  </button>
                </div>

                {/* Row 7: Social Proof / Reviews */}
                <div className="pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4 select-none">
                  {/* Avatars */}
                  <div className="flex items-center -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Client review avatar 1"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Client review avatar 2"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Client review avatar 3"
                    />
                    <img
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                      alt="Client review avatar 4"
                    />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center space-x-0.5 text-[#204031]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#204031] text-[#204031]" />
                    ))}
                  </div>

                  {/* Rating text */}
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]">
                    4.9 From 212 Client Reviews
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info Column: order-2 on mobile (BELOW FORM), order-1 on lg+ (LEFT) */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1 pt-6 lg:pt-0 border-t border-neutral-200/70 lg:border-t-0">
            {/* Desktop Heading (Visible on Desktop only) */}
            <h2
              className="hidden lg:block text-2xl sm:text-3xl lg:text-[2.25rem] font-normal leading-[1.22] tracking-[-0.015em] text-[#111827] mb-6"
              style={{
                fontFamily: "Georgia, 'Times New Roman', Cambria, serif",
              }}
            >
              There is no wrong way to start this. Tell us roughly what happened and we will
              take it from there.
            </h2>

            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#4B5563] mb-8 sm:mb-10 max-w-[520px]">
              If you would rather speak to someone, call . We answer, or we call back the same working day.
            </p>

            {/* Direct Contact Details List (1 Column: Icon on Left, Content on Right) */}
            <div className="flex flex-col space-y-5 sm:space-y-6 pt-1 pb-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] shadow-sm text-[#C65378]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">
                    Phone Number
                  </span>
                  <a
                    href="tel:+911112223334"
                    className="text-[15px] sm:text-[16px] font-medium text-[#111827] transition-colors hover:text-[#C65378]"
                  >
                    +91 1112223334
                  </a>
                  <span className="text-xs text-[#718096] mt-0.5">
                    Monday to Friday, 8:00 AM – 6:00 PM PT
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] shadow-sm text-[#C65378]">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">
                    Email Address
                  </span>
                  <a
                    href="mailto:hello@willdrafting.com"
                    className="text-[15px] sm:text-[16px] font-medium text-[#111827] transition-colors hover:text-[#C65378]"
                  >
                    hello@willdrafting.com
                  </a>
                  <span className="text-xs text-[#718096] mt-0.5">
                    We reply within 24 hours on working days
                  </span>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E5E7EB] shadow-sm text-[#C65378]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">
                    Office Location
                  </span>
                  <p className="text-[15px] sm:text-[16px] font-medium text-[#111827]">
                    1 Sansome Street, Suite 3500
                  </p>
                  <span className="text-xs text-[#718096] mt-0.5">
                    San Francisco, CA 94104
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FAQ />

      <Footer />
    </div>
  );
}
