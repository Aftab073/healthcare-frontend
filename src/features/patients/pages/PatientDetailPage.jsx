// src/features/patients/pages/PatientDetailPage.jsx

import { useParams } from 'react-router-dom'
import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'

/**
 * Patient Detail Page - Placeholder
 */

const PatientDetailPage = () => {
  const { id } = useParams()

  return (
    <div>
      <PageHeader
        title="Patient Details"
        subtitle={`Patient ID: ${id}`}
      />

      <Card className="p-6">
        <p className="text-gray-600">Patient details will be displayed here.</p>
      </Card>
    </div>
  )
}

export default PatientDetailPage