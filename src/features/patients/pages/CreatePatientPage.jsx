// src/features/patients/pages/CreatePatientPage.jsx

import PageHeader from '@/components/common/PageHeader'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

/**
 * Create Patient Page - Placeholder
 */

const CreatePatientPage = () => {
  return (
    <div>
      <PageHeader
        title="Add New Patient"
        subtitle="Enter patient details below"
      />

      <Card className="p-6 max-w-2xl">
        <form className="space-y-6">
          <Input label="Full Name" placeholder="Enter patient name" required />
          <Input label="Email" type="email" placeholder="patient@example.com" required />
          <Input label="Phone Number" placeholder="+1234567890" />
          <Input label="Date of Birth" type="date" />
          <Input label="Address" placeholder="Enter address" />
          
          <div className="flex justify-end space-x-3">
            <Button variant="secondary">Cancel</Button>
            <Button type="submit">Create Patient</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default CreatePatientPage