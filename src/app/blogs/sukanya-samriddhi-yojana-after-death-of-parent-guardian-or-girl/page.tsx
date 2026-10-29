import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "sukanya-samriddhi-yojana-after-death-of-parent-guardian-or-girl" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "sukanya-samriddhi-yojana-after-death-of-parent-guardian-or-girl" }),
  });
}
