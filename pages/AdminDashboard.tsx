import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
      <div className="mt-8 rounded-lg border-2 border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">Admin Access Required</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          // TODO: Implement Admin features:
          <br /> - View Reported Auctions
          <br /> - Ban Users
          <br /> - Delete Auctions
        </p>
        <div className="mt-6">
          <button className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;