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

  // Exact 3-digit overrides
  if (p3 === 403) return { state: "Goa" };
  if (p3 === 744) return { state: "Andaman and Nicobar Islands" };
  if (p3 === 682) return { state: "Lakshadweep" };
  if (p3 === 605) return { state: "Puducherry" };
  if (p3 === 160) return { state: "Chandigarh", city: "Chandigarh" };
  if (p3 !== null && p3 >= 246 && p3 <= 249) return { state: "Uttarakhand" };
  if (p3 !== null && p3 >= 262 && p3 <= 263) return { state: "Uttarakhand" };

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
  if (p2 === 79) return { state: "North East States" };
  if (p2 >= 80 && p2 <= 85) return { state: "Bihar" };
  if (p2 >= 81 && p2 <= 83) return { state: "Jharkhand" };

  return null;
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
        state: po.State,
        city: po.District || po.Name,
      };
    }
  } catch {
    // Return null to allow fallback to offline lookup
  }
  return null;
}
