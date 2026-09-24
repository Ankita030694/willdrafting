"use client";

import React, { useState } from "react";
import { WillDraftingState, bookConsultation } from "@/lib/willDraftingStore";
import { X } from "lucide-react";

interface ConsultationTabProps {
  state: WillDraftingState;
  onStateChange: (newState: WillDraftingState) => void;
}

interface LawyerProfile {
  id: string;
  name: string;
  initials: string;
  barReg: string;
  courts: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  fee: string;
  bio: string;
  availableSlot: string;
}

export default function ConsultationTab({ state, onStateChange }: ConsultationTabProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [bookingDate, setBookingDate] = useState("2026-09-18");
  const [bookingSlot, setBookingSlot] = useState("11:30 AM – 12:00 PM");
  const [bookingTopic, setBookingTopic] = useState("Complex Real Estate & Family Trusts");
  const [bookingNotes, setBookingNotes] = useState("");
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState("");

  const lawyers: LawyerProfile[] = [
    {
      id: "law-1",
      name: "Adv. Vikramaditya Sen",
      initials: "VS",
      barReg: "D/1842/2009 (Bar Council of Delhi)",
      courts: "Supreme Court of India & High Court of Delhi",
      experienceYears: 18,
      rating: 4.98,
      reviewsCount: 340,
      specialties: ["Succession under ISA 1925", "Family Trusts", "Cross-Border Estate Structuring"],
      fee: "₹ 2,499",
      bio: "Senior estate planning advocate advising HNIs, business families, and NRIs on conflict-free testamentary structures and probate litigation defense.",
      availableSlot: "Tomorrow, 11:30 AM",
    },
    {
      id: "law-2",
      name: "Adv. Meenakshi Sundaram",
      initials: "MS",
      barReg: "MS/1105/2012 (Bar Council of Tamil Nadu)",
      courts: "Madras High Court & Karnataka High Court",
      experienceYears: 14,
      rating: 4.95,
      reviewsCount: 215,
      specialties: ["Ancestral & Joint Property Partition", "Hindu Personal Law", "Nominee Disputes"],
      fee: "₹ 1,999",
      bio: "Specializes in multi-jurisdiction real estate conveyancing, clear title devolutions, and resolving complex coparcenary property inheritances.",
      availableSlot: "Thursday, 3:00 PM",
    },
    {
      id: "law-3",
      name: "Adv. Farhan Qureshi",
      initials: "FQ",
      barReg: "MAH/2481/2010 (Bar Council of Maharashtra & Goa)",
      courts: "High Court of Bombay",
      experienceYears: 16,
      rating: 4.92,
      reviewsCount: 180,
      specialties: ["Shariat Law Succession", "Hiba / Gift Deeds", "Commercial Succession"],
      fee: "₹ 2,499",
      bio: "Advocate with deep expertise in personal law harmonisation, estate duty mitigation, and testamentary probate applications in Mumbai.",
      availableSlot: "Friday, 5:00 PM",
    },
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLawyer) return;

    const updated = bookConsultation({
      lawyerId: selectedLawyer.id,
      lawyerName: selectedLawyer.name,
      lawyerFee: selectedLawyer.fee,
      dateTime: `${bookingDate} at ${bookingSlot}`,
      topic: bookingTopic,
      notes: bookingNotes,
    });

    onStateChange(updated);
    setBookingSuccessNotice(
      `Consultation confirmed with ${selectedLawyer.name} for ${bookingDate} at ${bookingSlot}. A calendar invite has been scheduled!`
    );
    setSelectedLawyer(null);
    setBookingNotes("");
    setTimeout(() => setBookingSuccessNotice(""), 6000);
  };

  const bookings = state.consultationBookings || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-card)",
          padding: "2.25rem 2rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-navy)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-gold)" }}></span>
          Section 40 • Expert Legal Advice
        </div>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--color-navy)", margin: 0 }}>
          Speak with a Qualified Estate Planning Advocate
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: "0.5rem 0 0", maxWidth: "720px" }}>
          Schedule a private 30-minute video consultation with senior advocates specializing in testamentary dispositions, cross-border inheritance, HUF partitions, and business succession.
        </p>
      </div>

      {/* Booking Success Notice */}
      {bookingSuccessNotice && (
        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "rgba(124, 148, 115, 0.18)",
            border: "1px solid var(--color-sage)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-navy)",
            fontSize: "0.9rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-sage)" }}></span>
          {bookingSuccessNotice}
        </div>
      )}

      {/* Active / Upcoming Bookings Section */}
      {bookings.length > 0 && (
        <div>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "1rem" }}>
            Your Scheduled Consultations
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {bookings.map((b) => (
              <div
                key={b.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-card)",
                  padding: "1.25rem 1.5rem",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <h4 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      {b.lawyerName}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        backgroundColor: "rgba(124, 148, 115, 0.2)",
                        color: "var(--color-navy)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "999px",
                      }}
                    >
                      Confirmed Appointment
                    </span>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-slate)", marginTop: "0.25rem" }}>
                    <strong>Topic:</strong> {b.topic} • <strong>Date & Time:</strong> {b.dateTime}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => alert("Simulated secure video conference link will open 10 mins prior to the session.")}
                    className="btn btn-gold"
                    style={{ padding: "0.45rem 1rem", fontSize: "0.8rem", borderRadius: "var(--radius-sm)" }}
                  >
                    Join Video Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lawyers Directory Grid */}
      <div>
        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "1rem" }}>
          Verified Estate Planning Specialists
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-card)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "var(--transition)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-gold)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-card)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-navy)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      border: "2px solid var(--color-gold)",
                      flexShrink: 0,
                    }}
                  >
                    {lawyer.initials}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
                      {lawyer.name}
                    </h4>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                      {lawyer.courts}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "0.8rem", color: "var(--color-slate)", marginBottom: "0.75rem" }}>
                  <strong>Reg:</strong> {lawyer.barReg} • <strong>Experience:</strong> {lawyer.experienceYears} Years
                </div>

                <p style={{ fontSize: "0.85rem", color: "var(--text-main)", lineHeight: 1.5, margin: "0 0 1rem" }}>
                  {lawyer.bio}
                </p>

                {/* Specialties tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                  {lawyer.specialties.map((spec) => (
                    <span
                      key={spec}
                      style={{
                        padding: "0.2rem 0.55rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        backgroundColor: "var(--bg-page)",
                        color: "var(--color-slate)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Fee & Booking Button */}
              <div
                style={{
                  borderTop: "1px solid var(--border-subtle)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Consultation Fee</span>
                  <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-navy)" }}>
                    {lawyer.fee}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}> / 30 mins</span>
                </div>

                <button
                  onClick={() => setSelectedLawyer(lawyer)}
                  className="btn btn-gold"
                  style={{
                    padding: "0.55rem 1.25rem",
                    fontSize: "0.85rem",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {selectedLawyer && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(27, 42, 74, 0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedLawyer(null)}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              maxWidth: "540px",
              padding: "2rem",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <h3 style={{ margin: 0, color: "var(--color-navy)", fontSize: "1.25rem", fontWeight: 700 }}>
                  Book 1-on-1 Strategy Session
                </h3>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  with {selectedLawyer.name} • {selectedLawyer.fee} (30 mins)
                </span>
              </div>
              <button
                onClick={() => setSelectedLawyer(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Select Consultation Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  min="2026-09-16"
                  onChange={(e) => setBookingDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Available Time Slot
                </label>
                <select
                  value={bookingSlot}
                  onChange={(e) => setBookingSlot(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="10:00 AM – 10:30 AM">10:00 AM – 10:30 AM</option>
                  <option value="11:30 AM – 12:00 PM">11:30 AM – 12:00 PM (Recommended)</option>
                  <option value="03:00 PM – 03:30 PM">03:00 PM – 03:30 PM</option>
                  <option value="05:30 PM – 06:00 PM">05:30 PM – 06:00 PM</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Primary Legal Topic
                </label>
                <select
                  value={bookingTopic}
                  onChange={(e) => setBookingTopic(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.9rem",
                    outline: "none",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <option value="Complex Real Estate & Family Trusts">Complex Real Estate & Family Trusts</option>
                  <option value="Minor Guardianship & Testamentary Trust">Minor Guardianship & Testamentary Trust</option>
                  <option value="Cross-Border / NRI Foreign Assets">Cross-Border / NRI Foreign Assets</option>
                  <option value="HUF Partition & Ancestral Shares">HUF Partition & Ancestral Shares</option>
                  <option value="General Indian Succession Act Review">General Indian Succession Act Review</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "0.35rem" }}>
                  Brief Notes / Specific Questions for Advocate
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., We have a jointly owned apartment in Gurgaon with loan outstanding, want to ensure smooth title transfer."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    fontSize: "0.85rem",
                    outline: "none",
                    fontFamily: "var(--font-main)",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setSelectedLawyer(null)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-card)",
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold"
                  style={{
                    padding: "0.6rem 1.5rem",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
