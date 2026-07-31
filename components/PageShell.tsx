import Navbar from "./Navbar";import Footer from "./Footer";export default function PageShell({children}:{children:React.ReactNode}){return <><Navbar/><main>{children}</main><Footer/></>}
