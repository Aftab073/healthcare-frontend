// src/features/patients/pages/CreatePatientPage.jsx

import { useNavigate } from 'react-router-dom'
import PageHeader from '../../../components/common/PageHeader'
import Card from '../../../components/ui/Card'
import PatientForm from '../components/PatientForm'
import { useCreatePatient } from '../hooks/usePatients'

/**
 * Create Patient Page
 * Form to add a new patient
 */

const CreatePatientPage = () => {
  const navigate = useNavigate()
  const createPatient = useCreatePatient()

  const handleSubmit = async (data) => {
    try {
      await createPatient.mutateAsync(data)
      navigate('/patients')
    } catch (error) {
      // Error is handled by the mutation hook
      console.error('Failed to create patient:', error)
    }
  }

  return (
    <div>
      <PageHeader
        title="Add New Patient"
        subtitle="Enter patient details below"
      />

      <Card className="p-6 max-w-4xl">
        <PatientForm
          onSubmit={handleSubmit}
          isLoading={createPatient.isPending}
          submitLabel="Create Patient"
        />
      </Card>
    </div>
  )
}

export default CreatePatientPage