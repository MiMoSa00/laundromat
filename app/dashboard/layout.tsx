// import Sidebar from "../components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* <Sidebar activeMenu="dashboard" /> */}
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}