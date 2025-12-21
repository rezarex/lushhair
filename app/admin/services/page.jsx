'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus, Save, X, Clock, DollarSign } from 'lucide-react';

const initialServices = [
  { id: 1, name: "Box Braids (Medium)", category: "Braids", price: "120", time: "4–6 hrs" },
  { id: 2, name: "Cornrows (Simple)", category: "Braids", price: "50", time: "1–2 hrs" },
  { id: 3, name: "Crochet Install", category: "Crochet", price: "90", time: "1.5–3 hrs" },
  { id: 4, name: "Basic Custom Wig", category: "Wigs", price: "250", time: "4–8 hrs" },
];

export default function ServicesManagement() {
  const [services, setServices] = useState(initialServices);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (service) => {
    setEditingId(service.id);
    setEditForm(service);
  };

  const handleSave = () => {
    setServices(services.map(s => s.id === editingId ? editForm : s));
    setEditingId(null);
  };

  const deleteService = (id) => {
    if(confirm("Are you sure you want to remove this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Services & Pricing</h2>
        <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-pink-700 transition-all">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Service Name</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Price ($)</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">Duration</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                {editingId === service.id ? (
                  /* --- Inline Edit Row --- */
                  <>
                    <td className="px-6 py-4"><input className="w-full bg-white dark:bg-gray-900 border border-pink-300 rounded px-2 py-1" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} /></td>
                    <td className="px-6 py-4">
                      <select className="bg-white dark:bg-gray-900 border border-pink-300 rounded px-2 py-1" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})}>
                        <option>Braids</option><option>Crochet</option><option>Wigs</option><option>Weaving</option>
                      </select>
                    </td>
                    <td className="px-6 py-4"><input className="w-20 bg-white dark:bg-gray-900 border border-pink-300 rounded px-2 py-1" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} /></td>
                    <td className="px-6 py-4"><input className="w-full bg-white dark:bg-gray-900 border border-pink-300 rounded px-2 py-1" value={editForm.time} onChange={e => setEditForm({...editForm, time: e.target.value})} /></td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={handleSave} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><Save size={18} /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg"><X size={18} /></button>
                    </td>
                  </>
                ) : (
                  /* --- Standard Row --- */
                  <>
                    <td className="px-6 py-4 font-medium dark:text-white">{service.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-md bg-pink-50 dark:bg-pink-900/20 text-pink-600 text-xs font-bold uppercase">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 dark:text-gray-300 font-bold">${service.price}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-sm">
                      <div className="flex items-center gap-1"><Clock size={14} /> {service.time}</div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => startEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"><Pencil size={18} /></button>
                      <button onClick={() => deleteService(service.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}