'use client'
interface LayoutProps {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="h-full w-full">{children}</div>
}

export default Layout
