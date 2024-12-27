import Header from "@/components/header";

export default function UnprotectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
          <Header  />
  {children}</>;
}
