import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "how-nri-can-register-or-execute-will-from-abroad-indian-embassy-apostille" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "how-nri-can-register-or-execute-will-from-abroad-indian-embassy-apostille" }),
  });
}
