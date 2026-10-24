import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/locations/will-drafting-in-gandhinagar",
        destination: "/locations/gandhinagar",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-amaravati",
        destination: "/locations/amaravati",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-puducherry",
        destination: "/locations/puducherry",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-lakshadweep",
        destination: "/locations/lakshadweep",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-ladakh",
        destination: "/locations/ladakh",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-jammu-and-kashmir",
        destination: "/locations/jammu-and-kashmir",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-dadra-and-nagar-haveli-and-daman-and-diu",
        destination: "/locations/dadra-and-nagar-haveli-and-daman-and-diu",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-andaman-and-nicobar-islands",
        destination: "/locations/andaman-and-nicobar-islands",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-west-bengal",
        destination: "/locations/west-bengal",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-tripura",
        destination: "/locations/tripura",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-mizoram",
        destination: "/locations/mizoram",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-manipur",
        destination: "/locations/manipur",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-jharkhand",
        destination: "/locations/jharkhand",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-kerala",
        destination: "/locations/kerala",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-assam",
        destination: "/locations/assam",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-chhattisgarh",
        destination: "/locations/chhattisgarh",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-himachal-pradesh",
        destination: "/locations/himachal-pradesh",
        permanent: true,
      },

      {
        source: "/locations/will-drafting-in-uttarakhand",
        destination: "/locations/uttarakhand",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-tamil-nadu",
        destination: "/locations/tamil-nadu",
        permanent: true,
      },

            {
        source: "/locations/will-drafting-in-telangana",
        destination: "/locations/telangana",
        permanent: true,
      },
{
        source: "/locations/will-drafting-in-andhra-pradesh",
        destination: "/locations/andhra-pradesh",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-karnataka",
        destination: "/locations/karnataka",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-madhya-pradesh",
        destination: "/locations/madhya-pradesh",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-gujarat",
        destination: "/locations/gujarat",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-rajasthan",
        destination: "/locations/rajasthan",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-uttar-pradesh",
        destination: "/locations/uttar-pradesh",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-haryana",
        destination: "/locations/haryana",
        permanent: true,
      },

      {
        source: "/locations/will-drafting-in-maharashtra",
        destination: "/locations/maharashtra",
        permanent: true,
      },

      {
        source: "/locations/will-drafting-in-delhi-nct",
        destination: "/locations/delhi-nct",
        permanent: true,
      },

      {
        source: "/locations/will-drafting-in-raipur",
        destination: "/locations/raipur",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-vijayawada",
        destination: "/locations/vijayawada",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-dehradun",
        destination: "/locations/dehradun",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-bhubaneswar",
        destination: "/locations/bhubaneswar",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-mangaluru",
        destination: "/locations/mangaluru",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-mysuru",
        destination: "/locations/mysuru",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-kozhikode",
        destination: "/locations/kozhikode",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-thiruvananthapuram",
        destination: "/locations/thiruvananthapuram",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-prayagraj",
        destination: "/locations/prayagraj",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-agra",
        destination: "/locations/agra",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-varanasi",
        destination: "/locations/varanasi",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-nashik",
        destination: "/locations/nashik",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-ludhiana",
        destination: "/locations/ludhiana",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-kanpur",
        destination: "/locations/kanpur",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-vadodara",
        destination: "/locations/vadodara",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-visakhapatnam",
        destination: "/locations/visakhapatnam",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-coimbatore",
        destination: "/locations/coimbatore",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-patna",
        destination: "/locations/patna",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-bhopal",
        destination: "/locations/bhopal",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-nagpur",
        destination: "/locations/nagpur",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-kochi",
        destination: "/locations/kochi",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-indore",
        destination: "/locations/indore",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-surat",
        destination: "/locations/surat",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-chandigarh",
        destination: "/locations/chandigarh",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-jaipur",
        destination: "/locations/jaipur",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-ahmedabad",
        destination: "/locations/ahmedabad",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-pune",
        destination: "/locations/pune",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-kolkata",
        destination: "/locations/kolkata",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-chennai",
        destination: "/locations/chennai",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-hyderabad",
        destination: "/locations/hyderabad",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-gurgaon",
        destination: "/locations/gurgaon",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-lucknow",
        destination: "/locations/lucknow",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-noida",
        destination: "/locations/noida",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-bengaluru",
        destination: "/locations/bengaluru",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-mumbai",
        destination: "/locations/mumbai",
        permanent: true,
      },
      {
        source: "/locations/will-drafting-in-delhi",
        destination: "/locations/delhi",
        permanent: true,
      },
      {
        source: "/contactus",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/aboutus",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/service",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/service/:slug*",
        destination: "/services/:slug*",
        permanent: true,
      },
      {
        source: "/nri-will-india",
        destination: "/services/nri-will-india",
        permanent: true,
      },
      {
        source: "/succession-calculator",
        destination: "/tools/succession-calculator",
        permanent: true,
      },
      {
        source: "/hindu-succession-calculator",
        destination: "/tools/succession-calculator",
        permanent: true,
      },
      {
        source: "/blogs/what-an-adjuster-is-doing-when-they-call",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/what-an-adjuster-is-doing",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/the-gap-in-your-medical-records",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/gap-in-medical-records",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/why-a-recorded-statement-is-not-neutral",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blogs/why-recorded-statement-is-not-neutral",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

