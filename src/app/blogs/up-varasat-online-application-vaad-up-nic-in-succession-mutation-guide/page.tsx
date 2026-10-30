import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "up-varasat-online-application-vaad-up-nic-in-succession-mutation-guide" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "up-varasat-online-application-vaad-up-nic-in-succession-mutation-guide" }),
  });
}
