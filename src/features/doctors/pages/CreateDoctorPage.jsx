import { useNavigate } from 'react-router-dom'
import PageHeader from '../../../components/common/PageHeader'
import Card from '../../../components/ui/Card'
import DoctorForm from '../components/DoctorForm'
import { useCreateDoctor } from '../hooks/useDoctors'

const CreateDoctorPage = () => {
  const navigate = useNavigate()
  const createDoctor = useCreateDoctor()

  const handleSubmit = async (data) => {
    try {
      await createDoctor.mutateAsync(data)
      navigate('/doctors')
    } catch (error) {
      console.error('Failed to create doctor:', error)
    }
  }

  return (
    <div>
      <PageHeader
        title="Add New Doctor"
        subtitle="Enter doctor details below"
      />

      <Card className="p-6 max-w-4xl">
        <DoctorForm
          onSubmit={handleSubmit}
          isLoading={createDoctor.isPending}
          submitLabel="Create Doctor"
        />
      </Card>
    </div>
  )
}

export default CreateDoctorPage