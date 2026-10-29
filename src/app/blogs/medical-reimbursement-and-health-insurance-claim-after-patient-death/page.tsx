import BlogSlugPage, { generateMetadata as generateDynamicMetadata } from "../[slug]/page";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  return generateDynamicMetadata({
    params: Promise.resolve({ slug: "medical-reimbursement-and-health-insurance-claim-after-patient-death" }),
  });
}

export default async function Page() {
  return BlogSlugPage({
    params: Promise.resolve({ slug: "medical-reimbursement-and-health-insurance-claim-after-patient-death" }),
  });
}
