import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CreateAuction: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: 0,
    minIncrement: 1,
    startTime: '',
    endTime: '',
    image: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
      alert("End time must be after start time");
      return;
    }

    // TODO: Upload image to Supabase Storage -> get URL
    // TODO: POST to /api/auctions

    console.log("Submitting Auction:", formData);
    alert("Auction created successfully (Mock)!");
    navigate('/');
  };

  if (!user) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-10">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl text-center max-w-md">
        <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">Authentication Required</h3>
        <p className="text-red-600 dark:text-red-300">You must be logged in as a student to sell items on UniBid.</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">List an Item</h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">Turn your unused gear into cash. Safe, campus-only auctions.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-700 space-y-8">
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Item Title</label>
            <input 
              type="text" 
              name="title" 
              placeholder="e.g. MacBook Pro M1 2020, Mint Condition"
              required
              className="block w-full rounded-xl border-slate-300 bg-slate-50 p-3.5 text-slate-900 focus:border-primary-500 focus:bg-white focus:ring-primary-500 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800 transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Description</label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Describe condition, accessories included, specs..."
              required
              className="block w-full rounded-xl border-slate-300 bg-slate-50 p-3.5 text-slate-900 focus:border-primary-500 focus:bg-white focus:ring-primary-500 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800 transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Starting Price ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  name="startingPrice" 
                  min="1"
                  required
                  className="block w-full rounded-xl border-slate-300 bg-slate-50 p-3.5 pl-8 text-slate-900 focus:border-primary-500 focus:bg-white focus:ring-primary-500 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800 transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Minimum Increment ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  name="minIncrement" 
                  min="1"
                  required
                  className="block w-full rounded-xl border-slate-300 bg-slate-50 p-3.5 pl-8 text-slate-900 focus:border-primary-500 focus:bg-white focus:ring-primary-500 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800 transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Start Time</label>
              <input 
                type="datetime-local" 
                name="startTime" 
                required
                className="block w-full rounded-xl border-slate-300 bg-slate-50 p-3.5 text-slate-900 focus:border-primary-500 focus:bg-white focus:ring-primary-500 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800 transition-all"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">End Time</label>
              <input 
                type="datetime-local" 
                name="endTime" 
                required
                className="block w-full rounded-xl border-slate-300 bg-slate-50 p-3.5 text-slate-900 focus:border-primary-500 focus:bg-white focus:ring-primary-500 dark:bg-slate-800/50 dark:border-slate-600 dark:text-white dark:focus:bg-slate-800 transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Upload Image</label>
            <div className="mt-1 flex justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 px-6 pt-8 pb-10 bg-slate-50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
              <div className="space-y-2 text-center">
                <div className="mx-auto h-14 w-14 text-slate-400 group-hover:text-primary-500 transition-colors">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <button type="button" className="rounded-xl px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button type="submit" className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/30 hover:to-primary-600 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all">
            Create Auction
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;