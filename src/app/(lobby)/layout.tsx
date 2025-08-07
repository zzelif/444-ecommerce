import Header from "@/components/layout/header"
import { Footer } from "@/components/layout/footer";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </div>
    )
}