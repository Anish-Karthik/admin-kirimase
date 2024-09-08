import { checkAuth } from "@/lib/auth/utils";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return ( <main>
<TrpcProvider cookies={cookies().toString()}>{children}</TrpcProvider>
</main> )
}