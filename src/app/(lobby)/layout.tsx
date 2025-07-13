import Header from "@/components/layout/header"

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
        </div>
    )
}