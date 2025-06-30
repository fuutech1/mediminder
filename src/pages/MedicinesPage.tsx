import React, { useState } from 'react';
import { Plus, Edit, Trash2, Clock, Calendar } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: number;
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export const MedicinesPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 1,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      instructions: 'Take with water, preferably in the morning'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 2,
      startDate: '2024-01-01',
      instructions: 'Take with meals'
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 1,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      instructions: 'Take in the evening'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 1,
    startDate: '',
    endDate: '',
    instructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMedicine) {
      // Update existing medicine
      setMedicines(prev => prev.map(med => 
        med.id === editingMedicine.id 
          ? { ...med, ...formData }
          : med
      ));
      setEditingMedicine(null);
    } else {
      // Add new medicine
      const newMedicine: Medicine = {
        id: Date.now().toString(),
        ...formData
      };
      setMedicines(prev => [...prev, newMedicine]);
    }

    // Reset form
    setFormData({
      name: '',
      dosage: '',
      frequency: 1,
      startDate: '',
      endDate: '',
      instructions: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      name: medicine.name,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      startDate: medicine.startDate,
      endDate: medicine.endDate || '',
      instructions: medicine.instructions || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(prev => prev.filter(med => med.id !== id));
    }
  };

  const cancelForm = () => {
    setShowAddForm(false);
    setEditingMedicine(null);
    setFormData({
      name: '',
      dosage: '',
      frequency: 1,
      startDate: '',
      endDate: '',
      instructions: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Medicines</h1>
          <p className="text-gray-600 mt-2">Manage your prescriptions and medications</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Lisinopril"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosage
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 10mg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency (times per day)
                </label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>Once daily</option>
                  <option value={2}>Twice daily</option>
                  <option value={3}>Three times daily</option>
                  <option value={4}>Four times daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date (optional)
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions (optional)
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Take with water, avoid alcohol"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
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

      {/* Medicines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                <p className="text-gray-600">{medicine.dosage}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(medicine)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(medicine.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{medicine.frequency} time{medicine.frequency > 1 ? 's' : ''} per day</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {new Date(medicine.startDate).toLocaleDateString()}
                  {medicine.endDate && ` - ${new Date(medicine.endDate).toLocaleDateString()}`}
                </span>
              </div>
            </div>

            {medicine.instructions && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">{medicine.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {medicines.length === 0 && !showAddForm && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines added yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first medication</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Medicine
          </button>
        </div>
      )}
    </div>
  );
};