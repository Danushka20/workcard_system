import DashboardLayout from '@/Layouts/DashboardLayout';
import { ReactNode, useState } from 'react';
import { router } from '@inertiajs/react';

interface MaterialItem {
  id: number;
  item_code: string;
  description: string;
  quantity: number;
}

const JobCreate = () => {
  // Form state
  const [formData, setFormData] = useState({
    ref_no: '',
    cost_center_no: '',
    department: '',
    details_of_job: '',
  });

  // Materials state
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: Date.now(), item_code: '', description: '', quantity: 1 }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle material input changes
  const handleMaterialChange = (id: number, field: keyof MaterialItem, value: string | number) => {
    setMaterials(prev => prev.map(material => {
      if (material.id === id) {
        return {
          ...material,
          [field]: value
        };
      }
      return material;
    }));
  };

  // Add new material row
  const addMaterial = () => {
    setMaterials(prev => [
      ...prev,
      { id: Date.now(), item_code: '', description: '', quantity: 1 }
    ]);
  };

  // Remove material row
  const removeMaterial = (id: number) => {
    if (materials.length > 1) {
      setMaterials(prev => prev.filter(material => material.id !== id));
    }
  };

  // Handle form submission using Inertia
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert materials to a format that Inertia can handle
    const materialsData = materials
      .filter(m => m.description.trim() !== '' || m.item_code.trim() !== '')
      .map(material => ({
        item_code: material.item_code,
        description: material.description,
        quantity: material.quantity
      }));
    
    const submissionData = {
      ...formData,
      materials: materialsData,
    };
    
    router.post('/jobs', submissionData, {
      onSuccess: () => {
        alert('Job created successfully!');
        setFormData({
          ref_no: '',
          cost_center_no: '',
          department: '',
          details_of_job: '',
        });
        setMaterials([{
            id: Date.now(), item_code: '', description: '', quantity: 1
        }]);
      },
      onError: (errors) => {
        setErrors(errors);
        alert('Please fix the validation errors.');
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Job</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Basic Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference No.</label>
              <input
                type="text"
                name="ref_no"
                value={formData.ref_no}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.ref_no ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter reference number"
                required
              />
              {errors.ref_no && (
                <p className="mt-1 text-sm text-red-600">{errors.ref_no}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost Center No.</label>
              <input
                type="text"
                name="cost_center_no"
                value={formData.cost_center_no}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cost_center_no ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter cost center number"
                required
              />
              {errors.cost_center_no && (
                <p className="mt-1 text-sm text-red-600">{errors.cost_center_no}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter department"
                required
              />
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">{errors.department}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Details of Job</label>
            <textarea
              name="details_of_job"
              value={formData.details_of_job}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.details_of_job ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Provide detailed description of the job"
              required
            ></textarea>
            {errors.details_of_job && (
              <p className="mt-1 text-sm text-red-600">{errors.details_of_job}</p>
            )}
          </div>
        </div>
        
        {/* Materials Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-semibold text-gray-700">Materials</h2>
            <button
              type="button"
              onClick={addMaterial}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Material
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Code</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="text"
                        value={material.item_code}
                        onChange={(e) => handleMaterialChange(material.id, 'item_code', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Item code"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="text"
                        value={material.description}
                        onChange={(e) => handleMaterialChange(material.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Material description"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="number"
                        min="1"
                        value={material.quantity}
                        onChange={(e) => handleMaterialChange(material.id, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {materials.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMaterial(material.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Wrap the page with the DashboardLayout
JobCreate.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default JobCreate;