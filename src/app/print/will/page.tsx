import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import WillDocument from "@/components/will/WillDocument";
import { verifyPdfToken } from "@/lib/pdfToken";
import { getWill, isWillHashValid } from "@/lib/wills";
import { BLANK_STATE } from "@/lib/willDraftingStore";

export const dynamic = "force-dynamic";
export const metadata = { title: "Will", robots: { index: false, follow: false } };

/**
 * Internal page opened ONLY by the server-side PDF renderer (see /api/will/pdf). Access needs a
 * short-lived signed token, and it renders only a paid-flow VERIFIED, unchanged Will.
 */
export default async function PrintWillPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const userId = verifyPdfToken(t);
  if (!userId || !ObjectId.isValid(userId)) notFound();

  const will = await getWill(new ObjectId(userId));
  if (!will || !will.detailsVerified || !will.lockedAt) notFound();
  if (!isWillHashValid(will.state, will.verifiedHash)) notFound();

  const state = { ...BLANK_STATE, ...will.state };

  return (
    <div
      id="printable-final-will"
      data-ready="1"
      style={{
        background: "#FFFFFF",
        color: "#000000",
        fontFamily: "'Times New Roman', Times, Georgia, serif",
        lineHeight: 1.75,
        padding: "0",
        width: "100%",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4 portrait;
              margin: 20mm 15mm 20mm 15mm;
            }
            body {
              background: #FFFFFF !important;
              color: #000000 !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .will-clause, .will-testimonium, .will-attestation {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
            .will-page-break-before {
              break-before: page !important;
              page-break-before: always !important;
            }
            thead {
              display: table-header-group;
            }
            tfoot {
              display: table-footer-group;
            }
            tr, td, th, thead, tfoot {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
            p {
              orphans: 3;
              widows: 3;
            }
          `,
        }}
      />
      <WillDocument state={state} />
    </div>
  );
}
