import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "vehicle-car-bike-rc-transfer-after-owner-death-form-31-parivahan" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "vehicle-car-bike-rc-transfer-after-owner-death-form-31-parivahan" }),
  });
}
