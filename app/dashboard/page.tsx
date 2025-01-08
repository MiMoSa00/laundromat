// src/app/dashboard/page.tsx
import { Metadata } from 'next'
import DashboardContent from '../components/DashboardContent'

export const metadata: Metadata = {
  title: 'Dashboard | LaundroMate',
  description: 'Manage your laundry services',
}

export default function DashboardPage() {
  return <DashboardContent />
}