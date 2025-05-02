import RootLayoutClient from "@/app/(cross-sell)/RootLayoutClient";

export default function SegurosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
} 