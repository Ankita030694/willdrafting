import { getAllSitemapLinks, SitemapPageItem } from "./sitemapData";

export interface LocationItem {
  id: string;
  slug: string;
  title: string;
  href: string;
  cityOrState: string;
  type: "Metro" | "State & UT" | "City";
  region: "North India" | "South India" | "West & Central" | "East & North-East";
  badge: string;
  badgeStyle: string;
  date: string;
  priority: number;
}

const METROS = new Set([
  "delhi",
  "mumbai",
  "bengaluru",
  "chennai",
  "kolkata",
  "hyderabad",
  "pune",
  "ahmedabad",
]);

const STATES_AND_UTS = new Set([
  "andaman-and-nicobar-islands",
  "andhra-pradesh",
  "arunachal-pradesh",
  "assam",
  "bihar",
  "chandigarh",
  "chhattisgarh",
  "dadra-and-nagar-haveli-and-daman-and-diu",
  "delhi-nct",
  "goa",
  "gujarat",
  "haryana",
  "himachal-pradesh",
  "jammu-and-kashmir",
  "jharkhand",
  "karnataka",
  "kerala",
  "ladakh",
  "lakshadweep",
  "madhya-pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "puducherry",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil-nadu",
  "telangana",
  "tripura",
  "uttar-pradesh",
  "uttarakhand",
  "west-bengal",
]);

const NORTH_REGION = new Set([
  "delhi",
  "delhi-nct",
  "gurgaon",
  "noida",
  "faridabad",
  "ghaziabad",
  "meerut",
  "agra",
  "kanpur",
  "lucknow",
  "prayagraj",
  "varanasi",
  "chandigarh",
  "amritsar",
  "ludhiana",
  "jammu",
  "srinagar",
  "jammu-and-kashmir",
  "ladakh",
  "shimla",
  "himachal-pradesh",
  "dehradun",
  "uttarakhand",
  "haryana",
  "punjab",
  "uttar-pradesh",
]);

const SOUTH_REGION = new Set([
  "bengaluru",
  "mysuru",
  "mangaluru",
  "chennai",
  "coimbatore",
  "madurai",
  "tiruchirappalli",
  "hyderabad",
  "vijayawada",
  "visakhapatnam",
  "amaravati",
  "kochi",
  "kozhikode",
  "thiruvananthapuram",
  "puducherry",
  "lakshadweep",
  "andhra-pradesh",
  "karnataka",
  "kerala",
  "tamil-nadu",
  "telangana",
]);

const WEST_AND_CENTRAL_REGION = new Set([
  "mumbai",
  "pune",
  "nagpur",
  "nashik",
  "ahmedabad",
  "surat",
  "vadodara",
  "rajkot",
  "gandhinagar",
  "jaipur",
  "udaipur",
  "kota",
  "bhopal",
  "indore",
  "gwalior",
  "raipur",
  "panaji",
  "goa",
  "gujarat",
  "maharashtra",
  "madhya-pradesh",
  "rajasthan",
  "chhattisgarh",
  "dadra-and-nagar-haveli-and-daman-and-diu",
]);

function formatSlugToDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "nct" || word.toLowerCase() === "ut") return word.toUpperCase();
      if (word.toLowerCase() === "and") return "&";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function getLocationItems(): LocationItem[] {
  const allLinks: SitemapPageItem[] = getAllSitemapLinks();
  const locationPages = allLinks.filter(
    (item) => item.href.startsWith("/locations/") && item.href !== "/locations"
  );

  return locationPages.map((item) => {
    const slug = item.href.replace("/locations/", "").replace(/\/$/, "");
    const cityOrState = formatSlugToDisplayName(slug);

    let type: "Metro" | "State & UT" | "City" = "City";
    let badge = "Locations";
    let badgeStyle = "bg-[#FAF7F0] text-[#49585F] border-[#172228]/10";

    if (METROS.has(slug)) {
      type = "Metro";
      badge = "Locations";
      badgeStyle = "bg-[#C65378]/10 text-[#C65378] border-[#C65378]/25";
    } else if (STATES_AND_UTS.has(slug)) {
      type = "State & UT";
      badge = "Locations";
      badgeStyle = "bg-[#5F7E75]/10 text-[#3d5951] border-[#5F7E75]/25";
    } else {
      type = "City";
      badge = "Locations";
      badgeStyle = "bg-[#172228]/5 text-[#172228] border-[#172228]/15";
    }

    let region: "North India" | "South India" | "West & Central" | "East & North-East" = "North India";
    if (SOUTH_REGION.has(slug)) {
      region = "South India";
    } else if (WEST_AND_CENTRAL_REGION.has(slug)) {
      region = "West & Central";
    } else if (NORTH_REGION.has(slug)) {
      region = "North India";
    } else {
      region = "East & North-East";
    }

    return {
      id: slug,
      slug,
      title: item.title,
      href: item.href,
      cityOrState,
      type,
      region,
      badge,
      badgeStyle,
      date: item.date || "26-10-2026",
      priority: item.priority || 0.8,
    };
  });
}
