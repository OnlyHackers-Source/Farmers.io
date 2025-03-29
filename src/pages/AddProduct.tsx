import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

export function AddProduct() {
  const { t } = useTranslation();

  const [product, setProduct] = useState({
    name: '',
    category: 'Grains',
    price: '',
    quantity: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Get ownerId from localStorage (set during login)
      const ownerId = localStorage.getItem('customerId');

      if (!ownerId) {
        toast.error('Please log in to add a product');
        return;
      }

      // Send POST request to backend
      const response = await axios.post('http://localhost:5003/products/add', {
        ...product,
        ownerId, // Include ownerId in the request
      });

      // Reset form
      setProduct({
        name: '',
        category: 'Grains',
        price: '',
        quantity: '',
        description: '',
      });

      // Show success toast
      toast.success(response.data.message || 'Product added successfully!', {
        duration: 4000, // 4 seconds
        position: 'top-right',
      });
    } catch (error) {
      console.error('Failed to save product:', error);
      // Show error toast
      toast.error('Failed to save product', {
        duration: 4000,
        position: 'top-right',
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Add Toaster component to display toasts */}
      <Toaster />
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('common.addProduct')}</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="Grains">Grains</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price per unit</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="pl-7 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity Available</label>
          <input
            type="text"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="e.g., 100 kg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Images</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {t('common.submit')}
          </button>
        </div>
      </form>
    </div>
  );
}