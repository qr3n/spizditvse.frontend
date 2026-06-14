import { Layout } from "@/src/widgets/Layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
