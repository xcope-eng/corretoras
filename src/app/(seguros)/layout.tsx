import RootLayoutClient from "@/app/(seguros)/RootLayoutClient";

export default function SegurosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
} 