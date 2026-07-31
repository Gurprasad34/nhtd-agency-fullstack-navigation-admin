import type { Metadata } from "next"; import "./globals.css";
export const metadata: Metadata={title:{default:"Independent Pathways | NHTD Waiver Services",template:"%s | Independent Pathways"},description:"Service Coordination and Independent Living Skills Training for New Yorkers."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
