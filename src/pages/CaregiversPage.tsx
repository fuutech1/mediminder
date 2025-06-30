import React, { useState } from 'react';
import { Plus, Edit, Trash2, Phone, Mail, Star, AlertTriangle } from 'lucide-react';

interface Caregiver {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  isPrimary: boolean;
}

export const CaregiversPage: React.FC = () => {
  const [caregivers, setCaregivers] = useState<Caregiver[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
      relationship: 'Daughter',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      phone: '+1 (555) 987-6543',
      email: 'mchen@healthcenter.com',
      relationship: 'Primary Care Physician',
      isPrimary: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCaregiver, setEditingCaregiver] = useState<Caregiver | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    isPrimary: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCaregiver) {
      setCaregivers(prev => prev.map(caregiver => 
        caregiver.id === editingCaregiver.id 
          ? { ...caregiver, ...formData }
          : caregiver
      ));
      setEditingCaregiver(null);
    } else {
      const newCaregiver: Caregiver = {
        id: Date.now().toString(),
        ...formData
      };
      setCaregivers(prev => [...prev, newCaregiver]);
    }

    setFormData({
      name: '',
      phone: '',
      email: '',
      relationship: '',
      isPrimary: false
    });
    setShowAddForm(false);
  };

  const handleEdit = (caregiver: Caregiver) => {
    setEditingCaregiver(caregiver);
    setFormData({
      name: caregiver.name,
      phone: caregiver.phone,
      email: caregiver.email,
      relationship: caregiver.relationship,
      isPrimary: caregiver.isPrimary
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this caregiver?')) {
      setCaregivers(prev => prev.filter(caregiver => caregiver.id !== id));
    }
  };

  const testAlert = (caregiver: Caregiver) => {
    alert(`🚨 Demo Alert Sent to ${caregiver.name}:\n\n"MEDICAL ALERT: Patient reported severe side effects. Please check on them immediately."\n\n📱 SMS sent to: ${caregiver.phone}\n📧 Email sent to: ${caregiver.email}`);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingCaregiver(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      relationship: '',
      isPrimary: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Caregivers</h1>
          <p className="text-gray-600 mt-2">Manage your emergency contacts and healthcare providers</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Caregiver</span>
        </button>
      </div>

      {/* Alert Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-900">Emergency Alert System</h3>
            <p className="text-sm text-amber-700 mt-1">
              Your caregivers will be automatically notified via SMS and email when you report severe side effects. 
              Primary caregivers receive priority alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingCaregiver ? 'Edit Caregiver' : 'Add New Caregiver'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <select
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Son">Son</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Primary Care Physician">Primary Care Physician</option>
                  <option value="Specialist">Specialist</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPrimary"
                id="isPrimary"
                checked={formData.isPrimary}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPrimary" className="ml-2 block text-sm text-gray-700">
                Primary caregiver (receives priority alerts)
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingCaregiver ? 'Update Caregiver' : 'Add Caregiver'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Caregivers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caregivers.map((caregiver) => (
          <div key={caregiver.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">{caregiver.name}</h3>
                {caregiver.isPrimary && (
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(caregiver)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(caregiver.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-600">{caregiver.relationship}</p>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{caregiver.phone}</span>
              </div>
              {caregiver.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{caregiver.email}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => testAlert(caregiver)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Test Alert</span>
            </button>
          </div>
        ))}
      </div>

      {caregivers.length === 0 && !showAddForm && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No caregivers added yet</h3>
          <p className="text-gray-600 mb-4">Add your emergency contacts and healthcare providers</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Caregiver
          </button>
        </div>
      )}
    </div>
  );
};