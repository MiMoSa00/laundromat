import Sidebar from "../components/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeMenu="dashboard" />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  )
}