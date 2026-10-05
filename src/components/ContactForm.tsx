"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    whenDidItHappen: "",
    whatHappened: "",
    agreeDisclaimer: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
          errorData.error || "Failed to submit inquiry. Please try again or call our helpline."
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
          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
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
                required
                className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
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
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] outline-none transition-colors"
            />
          </div>

          {/* Row 3: What do you need help with */}
          <div className="flex flex-col">
            <label
              htmlFor="whenDidItHappen"
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
            >
              WHAT DO YOU NEED HELP WITH?
            </label>
            <input
              id="whenDidItHappen"
              name="whenDidItHappen"
              type="text"
              value={formData.whenDidItHappen}
              onChange={handleChange}
              placeholder="e.g. I want to draft a Will for my family"
              className="w-full bg-transparent border-0 border-b border-[#D1D5DB] focus:border-[#111827] focus:ring-0 px-0 py-2 text-base text-[#111827] placeholder:text-[#9CA3AF] placeholder:font-light outline-none transition-colors"
            />
          </div>

          {/* Row 4: Tell us a little more */}
          <div className="flex flex-col">
            <label
              htmlFor="whatHappened"
              className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6B7280] mb-1.5"
            >
              TELL US A LITTLE MORE
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
                I understand that submitting this inquiry does not create a formal attorney-client relationship.
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
              className="inline-flex items-center justify-center bg-[#C65378] text-white px-8 py-3.5 rounded-full font-medium text-[15px] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
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
