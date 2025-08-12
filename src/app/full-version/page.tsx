import type { Metadata } from "next";
import FullVersionSection from "@/components/sections/home/full-version-section";

export const metadata: Metadata = {
  title: "Full Version – MicroStudio",
  description:
    "Unlock the full version of MicroStudio to access premium components and sections for your Next.js project.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <FullVersionSection />
    </main>
  );
}
