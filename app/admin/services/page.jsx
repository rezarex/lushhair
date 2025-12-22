"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Plus, X, Save, Upload, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '@/config/config';

const SERVICES_API = `${API_BASE_URL}/services`;

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch(SERVICES_API);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This will delete the category and all its items.")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/services/delete/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter(s => s._id !== id));
      }
    } catch (err) {
      alert("Error deleting service");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-yellow-500 tracking-tight text-shadow-sm">Service Catalog</h1>
            <p className="text-zinc-500 mt-1 font-medium">Manage hair styles, pricing, and categories.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-900/20"
          >
            <Plus size={20} /> Add Category
          </button>
        </header>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
          <table className="w-full">
            <thead className="bg-zinc-900/80">
              <tr className="text-left border-b border-zinc-800 text-yellow-500/80 text-xs uppercase tracking-widest font-black">
                <th className="p-6">Category</th>
                <th className="p-6">Items</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-20 text-center text-zinc-600 font-medium">
                    {loading ? <Loader2 className="animate-spin mx-auto w-8 h-8" /> : 'No services found.'}
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={service.image} className="w-14 h-14 rounded-xl object-cover border-2 border-zinc-800 group-hover:border-yellow-500/50 transition-all" alt="" />
                        <span className="font-bold text-lg">{service.category}</span>
                      </div>
                    </td>
                    <td className="p-6 text-zinc-400 font-mono text-sm">
                      {service.items.length} services listed
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => { setCurrentService(service); setIsEditModalOpen(true); }} className="p-2 bg-zinc-800 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(service._id)} className="p-2 bg-zinc-800 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && <ServiceModal mode="edit" service={currentService} onClose={() => setIsEditModalOpen(false)} onRefresh={fetchServices} />}
      {isAddModalOpen && <ServiceModal mode="add" onClose={() => setIsAddModalOpen(false)} onRefresh={fetchServices} />}
    </div>
  );
}

// Unified Modal for Add/Edit
function ServiceModal({ mode, service, onClose, onRefresh }) {
const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Store actual File object
  const [previewUrl, setPreviewUrl] = useState(mode === 'edit' ? service.image : '');
  const [formData, setFormData] = useState(mode === 'edit' ? { ...service } : {
    category: '',
    icon: 'Zap',
    items: [{ name: '', price: '', time: '' }]
  });

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file); // Keep the binary file for the request
    setPreviewUrl(URL.createObjectURL(file)); // Create a local preview URL
  };

  const handleSave = async () => {
    if (!formData.category || (!selectedFile && mode === 'add')) {
      alert("Category and Image are required");
      return;
    }

    // Use FormData instead of a JSON object
    const data = new FormData();
    data.append('category', formData.category);
    data.append('icon', formData.icon || 'Zap');
    
    // Send the actual binary file
    if (selectedFile) {
      data.append('image', selectedFile);
    }

    // Stringify the items array to match the -F 'items=[...]' format
    const itemsToSend = formData.items.map(({ name, price, time }) => ({ name, price, time }));
    data.append('items', JSON.stringify(itemsToSend));

    try {
      const url = mode === 'add' 
        ? `${API_BASE_URL}/services/add` 
        : `${API_BASE_URL}/services/edit/${service._id}`;
      
      const method = mode === 'add' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method: method,
        headers: { 
          'accept': '*/*' 
          // Note: DO NOT set 'Content-Type' header here. 
          // The browser will automatically set it to multipart/form-data 
          // and include the correct boundary string.
        },
        body: data,
      });

      if (res.ok) {
        onRefresh();
        onClose();
      } else {
        const errorText = await res.text();
        console.error("Server Error:", errorText);
        alert("Failed to save. Check console for details.");
      }
    } catch (err) {
      console.error("Network Error:", err);
    }
  };

  return (
<div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-[200]">
      <div className="bg-zinc-900 border border-yellow-500/20 w-full max-w-2xl rounded-3xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-yellow-500 italic uppercase tracking-tighter">
            {mode === 'add' ? 'New Category' : 'Edit Category'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white bg-zinc-800 p-2 rounded-full"><X size={20}/></button>
        </div>

        <div className="space-y-6">
          {/* Image Upload Area */}
          <div 
            className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl p-6 bg-black/40 hover:border-yellow-500/40 transition-all cursor-pointer group" 
            onClick={() => fileInputRef.current.click()}
          >
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            {previewUrl ? (
              <div className="relative w-full h-40">
                <img src={previewUrl} className="w-full h-full object-contain rounded-lg" alt="Preview" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                   <Upload className="text-white" />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto text-zinc-600 mb-2 group-hover:text-yellow-500" size={40} />
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Click to upload image</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase text-zinc-500 font-black mb-2 tracking-widest">Category Name</label>
            <input 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-black border-2 border-zinc-800 rounded-xl p-4 focus:border-green-500 outline-none transition-all font-bold text-lg text-white"
            />
          </div>

          <div className="bg-zinc-950 border-2 border-zinc-800 p-6 rounded-2xl">
             <div className="flex justify-between items-center mb-6">
               <label className="text-xs uppercase text-green-500 font-black tracking-widest">Sub-Services & Pricing</label>
               <button onClick={() => setFormData({...formData, items: [...formData.items, { name: '', price: '', time: '' }]})} className="text-xs bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-bold flex items-center gap-2 transition-all">
                 <Plus size={14} /> Add Item
               </button>
             </div>
             
             <div className="space-y-3">
               {formData.items.map((item, index) => (
                 <div key={index} className="flex gap-2 items-center animate-in fade-in slide-in-from-bottom-2">
                   <input className="bg-zinc-900 p-3 rounded-lg text-sm border border-zinc-800 flex-[2] font-bold" value={item.name} placeholder="Name" onChange={(e) => {
                     const newItems = [...formData.items]; newItems[index].name = e.target.value; setFormData({...formData, items: newItems});
                   }} />
                   <input className="bg-zinc-900 p-3 rounded-lg text-sm border border-zinc-800 flex-1 text-yellow-500 font-bold" value={item.price} placeholder="Price" onChange={(e) => {
                     const newItems = [...formData.items]; newItems[index].price = e.target.value; setFormData({...formData, items: newItems});
                   }} />
                   <input className="bg-zinc-900 p-3 rounded-lg text-sm border border-zinc-800 flex-1 text-zinc-400 font-bold" value={item.time} placeholder="Time" onChange={(e) => {
                     const newItems = [...formData.items]; newItems[index].time = e.target.value; setFormData({...formData, items: newItems});
                   }} />
                   {formData.items.length > 1 && (
                     <button onClick={() => setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) })} className="p-3 text-red-500 hover:bg-red-500/10 rounded-lg"><X size={18} /></button>
                   )}
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button onClick={handleSave} className="flex-[2] bg-yellow-500 hover:bg-yellow-600 text-black py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-yellow-900/20 transition-all active:scale-95">
            <Save size={20} /> {mode === 'add' ? 'Publish Service' : 'Save Updates'}
          </button>
          <button onClick={onClose} className="flex-1 px-6 py-4 border-2 border-zinc-800 rounded-2xl hover:bg-zinc-800 text-white font-bold uppercase text-xs tracking-widest transition-all">
            Cancel
          </button>
        </div>
      
      </div>
    </div>
  );
}