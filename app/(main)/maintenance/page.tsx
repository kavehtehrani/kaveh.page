import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
export const metadata: Metadata = buildPageMetadata({
  title: "Maintenance",
  description: "This section is under maintenance",
  path: "/maintenance",
  noIndex: true,
});

export default function Maintenance() {
  return (
    <div>
      <h1 className="text-xl">
        I am revamping this section of the website, please check back later.
      </h1>
    </div>
  );
}

