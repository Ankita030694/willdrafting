export const INDIAN_STATES_AND_UTS = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianState = typeof INDIAN_STATES_AND_UTS[number];

export function lookupStateFromPin(pin: string): { state: string; city?: string } | null {
  const p = pin.replace(/\D/g, "").trim();
  if (p.length < 2) return null;
  const p2 = parseInt(p.substring(0, 2), 10);
  const p3 = p.length >= 3 ? parseInt(p.substring(0, 3), 10) : null;

  // Exact 3-digit UT & State overrides
  if (p3 === 160) return { state: "Chandigarh", city: "Chandigarh" };
  if (p3 === 194) return { state: "Ladakh", city: "Leh" };
  if (p3 === 396) return { state: "Dadra and Nagar Haveli and Daman and Diu" };
  if (p3 === 403) return { state: "Goa" };
  if (p3 === 605) return { state: "Puducherry", city: "Puducherry" };
  if (p3 === 682) return { state: "Lakshadweep" };
  if (p3 === 737) return { state: "Sikkim", city: "Gangtok" };
  if (p3 === 744) return { state: "Andaman and Nicobar Islands", city: "Port Blair" };
  if (p3 !== null && p3 >= 790 && p3 <= 792) return { state: "Arunachal Pradesh" };
  if (p3 === 793 || p3 === 794) return { state: "Meghalaya", city: "Shillong" };
  if (p3 === 795) return { state: "Manipur", city: "Imphal" };
  if (p3 === 796) return { state: "Mizoram", city: "Aizawl" };
  if (p3 === 797 || p3 === 798) return { state: "Nagaland" };
  if (p3 === 799) return { state: "Tripura", city: "Agartala" };
  if (p3 !== null && p3 >= 246 && p3 <= 249) return { state: "Uttarakhand" };
  if (p3 !== null && p3 >= 262 && p3 <= 263) return { state: "Uttarakhand" };

  // Major metro 3-digit instant city hints
  if (p3 === 121) return { state: "Haryana", city: "Faridabad" };
  if (p3 === 190) return { state: "Jammu and Kashmir", city: "Srinagar" };
  if (p3 === 248) return { state: "Uttarakhand", city: "Dehradun" };
  if (p3 === 122) return { state: "Haryana", city: "Gurugram" };
  if (p3 === 141) return { state: "Punjab", city: "Ludhiana" };
  if (p3 === 201) return { state: "Uttar Pradesh", city: "Noida" };
  if (p3 === 221) return { state: "Uttar Pradesh", city: "Varanasi" };
  if (p3 === 226) return { state: "Uttar Pradesh", city: "Lucknow" };
  if (p3 === 250) return { state: "Uttar Pradesh", city: "Meerut" };
  if (p3 === 302) return { state: "Rajasthan", city: "Jaipur" };
  if (p3 === 313) return { state: "Rajasthan", city: "Udaipur" };
  if (p3 === 324) return { state: "Rajasthan", city: "Kota" };
  if (p3 === 360) return { state: "Gujarat", city: "Rajkot" };
  if (p3 === 380) return { state: "Gujarat", city: "Ahmedabad" };
  if (p3 === 395) return { state: "Gujarat", city: "Surat" };
  if (p3 === 400) return { state: "Maharashtra", city: "Mumbai" };
  if (p3 === 411) return { state: "Maharashtra", city: "Pune" };
  if (p3 === 422) return { state: "Maharashtra", city: "Nashik" };
  if (p3 === 440) return { state: "Maharashtra", city: "Nagpur" };
  if (p3 === 452) return { state: "Madhya Pradesh", city: "Indore" };
  if (p3 === 462) return { state: "Madhya Pradesh", city: "Bhopal" };
  if (p3 === 474) return { state: "Madhya Pradesh", city: "Gwalior" };
  if (p3 === 500) return { state: "Telangana", city: "Hyderabad" };
  if (p3 === 530) return { state: "Andhra Pradesh", city: "Visakhapatnam" };
  if (p3 === 560) return { state: "Karnataka", city: "Bengaluru" };
  if (p3 === 570) return { state: "Karnataka", city: "Mysuru" };
  if (p3 === 575) return { state: "Karnataka", city: "Mangaluru" };
  if (p3 === 600) return { state: "Tamil Nadu", city: "Chennai" };
  if (p3 === 620) return { state: "Tamil Nadu", city: "Tiruchirappalli" };
  if (p3 === 641) return { state: "Tamil Nadu", city: "Coimbatore" };
  if (p3 === 673) return { state: "Kerala", city: "Kozhikode" };
  if (p3 === 695) return { state: "Kerala", city: "Thiruvananthapuram" };
  if (p3 === 700) return { state: "West Bengal", city: "Kolkata" };
  if (p3 === 751) return { state: "Odisha", city: "Bhubaneswar" };
  if (p3 === 781) return { state: "Assam", city: "Guwahati" };
  if (p3 === 791) return { state: "Arunachal Pradesh", city: "Itanagar" };
  if (p3 === 180) return { state: "Jammu and Kashmir", city: "Jammu" };
  if (p3 === 190) return { state: "Jammu and Kashmir", city: "Srinagar" };
  if (p3 === 800 || p3 === 801) return { state: "Bihar", city: "Patna" };
  if (p3 === 834) return { state: "Jharkhand", city: "Ranchi" };

  // 2-digit state prefixes
  if (p2 === 11) return { state: "Delhi", city: "New Delhi" };
  if (p2 === 12 || p2 === 13) return { state: "Haryana" };
  if (p2 === 14 || p2 === 15 || p2 === 16) return { state: "Punjab" };
  if (p2 === 17) return { state: "Himachal Pradesh" };
  if (p2 === 18 || p2 === 19) return { state: "Jammu and Kashmir" };
  if (p2 >= 20 && p2 <= 28) return { state: "Uttar Pradesh" };
  if (p2 >= 30 && p2 <= 34) return { state: "Rajasthan" };
  if (p2 >= 36 && p2 <= 39) return { state: "Gujarat" };
  if (p2 >= 40 && p2 <= 44) return { state: "Maharashtra" };
  if (p2 >= 45 && p2 <= 48) return { state: "Madhya Pradesh" };
  if (p2 === 49) return { state: "Chhattisgarh" };
  if (p2 >= 50 && p2 <= 53) {
    if (p2 <= 50) return { state: "Telangana" };
    return { state: "Andhra Pradesh" };
  }
  if (p2 >= 56 && p2 <= 59) return { state: "Karnataka" };
  if (p2 >= 60 && p2 <= 64) return { state: "Tamil Nadu" };
  if (p2 >= 67 && p2 <= 69) return { state: "Kerala" };
  if (p2 >= 70 && p2 <= 74) return { state: "West Bengal" };
  if (p2 >= 75 && p2 <= 77) return { state: "Odisha" };
  if (p2 === 78) return { state: "Assam" };
  if (p2 === 79) return { state: "Meghalaya" };
  if (p2 >= 81 && p2 <= 83) return { state: "Jharkhand" };
  if (p2 >= 80 && p2 <= 85) return { state: "Bihar" };

  return null;
}

function normalizeStateName(rawState: string): string {
  const s = (rawState || "").trim();
  if (!s) return "";
  const lower = s.toLowerCase();
  if (lower.includes("delhi")) return "Delhi";
  if (lower.includes("andaman")) return "Andaman and Nicobar Islands";
  if (lower.includes("dadra") || lower.includes("daman")) return "Dadra and Nagar Haveli and Daman and Diu";
  if (lower.includes("jammu")) return "Jammu and Kashmir";
  if (lower.includes("pondicherry") || lower.includes("puducherry")) return "Puducherry";
  const match = INDIAN_STATES_AND_UTS.find((item) => item.toLowerCase() === lower);
  return match || s;
}

/**
 * Fetch detailed postal location from public API
 */
export async function fetchPincodeDetails(pin: string): Promise<{ state: string; city: string } | null> {
  const clean = pin.replace(/\D/g, "").trim();
  if (clean.length !== 6) return null;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${clean}`, {
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
      const po = data[0].PostOffice[0];
      return {
        state: normalizeStateName(po.State || ""),
        city: po.District || po.Block || po.Region || po.Name || "",
      };
    }
  } catch {
    // Return fallback to offline lookup
  }
  const fallback = lookupStateFromPin(clean);
  return fallback ? { state: fallback.state, city: fallback.city || "" } : null;
}
