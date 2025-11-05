// src/features/doctors/pages/CreateDoctorPage.jsx

import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

/**
 * Create Doctor Page - Placeholder
 */

const CreateDoctorPage = () => {
  return (
    <div>
      <PageHeader
        title="Add New Doctor"
        subtitle="Enter doctor details below"
      />

      <Card className="p-6 max-w-2xl">
        <form className="space-y-6">
          <Input label="Full Name" placeholder="Dr. John Smith" required />
          <Input label="Email" type="email" placeholder="doctor@hospital.com" required />
          <Input label="Phone Number" placeholder="+1234567890" />
          <Input label="Specialization" placeholder="Cardiologist" />
          <Input label="License Number" placeholder="MED-2024-001" />
          
          <div className="flex justify-end space-x-3">
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Create Doctor</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default CreateDoctorPage