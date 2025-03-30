import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';

export function AddProduct() {
  const { t } = useTranslation();

  const [product, setProduct] = useState({
    name: '',
    category: 'Grains',
    price: '',
    quantity: '',
    description: '',
  });
  const [image, setImage] = useState<File | null>(null); // State for image file

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const ownerId = localStorage.getItem('customerId');
      if (!ownerId) {
        toast.error('Please log in to add a product');
        return;
      }

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('quantity', product.quantity);
      formData.append('description', product.description);
      formData.append('ownerId', ownerId);
      if (image) formData.append('image', image); // Append image if selected

      const response = await axios.post('http://localhost:5003/products/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Reset form
      setProduct({
        name: '',
        category: 'Grains',
        price: '',
        quantity: '',
        description: '',
      });
      setImage(null); // Reset image
      toast.success(response.data.message || 'Product added successfully!');
    } catch (error) {
      console.error('Failed to save product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
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