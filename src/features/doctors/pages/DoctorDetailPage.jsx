// src/features/doctors/pages/DoctorDetailPage.jsx

import { useParams } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'

/**
 * Doctor Detail Page - Placeholder
 */

const DoctorDetailPage = () => {
  const { id } = useParams()

  return (
    <div>
      <PageHeader
        title="Doctor Details"
        subtitle={`Doctor ID: ${id}`}
      />

      <Card className="p-6">
        <p className="text-gray-600">Doctor details will be displayed here.</p>
      </Card>
    </div>
  )
}

export default DoctorDetailPage