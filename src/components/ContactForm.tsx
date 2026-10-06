"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";
import { INDIAN_STATES_AND_UTS } from "@/lib/pincode";

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-load thank you page in the browser cache for instant transition
  useEffect(() => {
    router.prefetch("/thank-you");
  }, [router]);

  // Name: only alphabets and whitespaces allowed
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFormData((prev) => ({ ...prev, name: val }));
    if (errorMessage) setErrorMessage("");
  };

  // Number: only 10 digit numerics allowed nothing else
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: val }));
    if (errorMessage) setErrorMessage("");
  };

  // Email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (errorMessage) setErrorMessage("");
  };

  // State
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, state: e.target.value }));
    if (errorMessage) setErrorMessage("");
  };

  // Message (optional)
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, message: e.target.value }));
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name (letters and spaces only).");
      return;
    }

    if (!formData.phone || formData.phone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.state) {
      setErrorMessage("Please select your state or union territory.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/thank-you");
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrorMessage(
          errorData.error || "Failed to submit inquiry. Please try again or write to hello@willdrafting.in."
        );
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      router.push("/thank-you");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-7 sm:space-y-8">
        {/* Row 1: Name and Phone Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
            >
              Your Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Rohit Sharma"
              className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="phone"
                className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280]"
              >
                Phone Number *
              </label>
              {formData.phone.length > 0 && (
                <span
                  className={`text-[10px] font-semibold ${
                    formData.phone.length === 10 ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {formData.phone.length === 10 ? "✓ 10 digits valid" : `${formData.phone.length}/10 digits`}
                </span>
              )}
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit number"
              className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors"
            />
          </div>
        </div>

        {/* Row 2: Email and State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="name@example.com"
              className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
            >
              State / UT *
            </label>
            <select
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleStateChange}
              className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] outline-none transition-colors cursor-pointer"
            >
              <option value="" disabled className="text-gray-400">
                Select State / UT
              </option>
              {INDIAN_STATES_AND_UTS.map((st) => (
                <option key={st} value={st} className="text-[#111827] bg-white">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3: Optional Message */}
        <div className="flex flex-col">
          <label
            htmlFor="message"
            className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
          >
            Message <span className="font-normal lowercase text-[#9CA3AF]">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleMessageChange}
            placeholder="How can our legal advisory team assist you? (Optional)"
            className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors resize-none"
          />
        </div>

        {/* Error Banner if any */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center bg-[#C65378] text-white px-8 py-3.5 rounded-full font-medium text-[15px] transition-all duration-200 shadow-sm hover:shadow hover:bg-[#A83D60] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
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

        {/* Social Proof / Reviews */}
        <div className="pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4 select-none">
          {/* Avatars */}
          <div className="flex items-center -space-x-2 overflow-hidden">
            <div className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Verified user testimonial photo 1"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Verified user testimonial photo 2"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Verified user testimonial photo 3"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="relative inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                alt="Verified user testimonial photo 4"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
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
    </div>
  );
}
