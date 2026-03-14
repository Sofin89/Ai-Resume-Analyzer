import React, { useState } from "react";
import { showSuccess } from "../../utils/toast";

const AdminSettings = () => {
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState({
        siteName: "Smart AI Resume Analyzer",
        maintenanceMode: false,
        maxUploadSize: "5",
        allowRegistrations: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            showSuccess("Settings saved successfully!");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center">
                    <button
                        onClick={() => window.history.back()}
                        className="mr-6 p-2 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Go Back"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">System Settings</h1>
                        <p className="text-slate-600">Configure global platform configurations and preferences</p>
                    </div>
                </div>

                <form onSubmit={handleSave} className="bg-white shadow-xl rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="p-8 space-y-8">

                        {/* General Settings */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">General Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                                    <input
                                        type="text"
                                        name="siteName"
                                        value={settings.siteName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Max Upload PDF Size (MB)</label>
                                    <input
                                        type="number"
                                        name="maxUploadSize"
                                        value={settings.maxUploadSize}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Platform Controls */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">Platform Controls</h3>
                            <div className="space-y-4">

                                <label className="flex items-center p-4 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        name="allowRegistrations"
                                        checked={settings.allowRegistrations}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <div className="ml-4">
                                        <span className="block text-sm font-bold text-slate-800">Allow New User Registrations</span>
                                        <span className="block text-sm text-slate-500">If unchecked, no new users can sign up.</span>
                                    </div>
                                </label>

                                <label className="flex items-center p-4 border border-rose-200 bg-rose-50 rounded-xl hover:bg-rose-100 cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        name="maintenanceMode"
                                        checked={settings.maintenanceMode}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500 border-rose-300"
                                    />
                                    <div className="ml-4">
                                        <span className="block text-sm font-bold text-rose-800">Maintenance Mode</span>
                                        <span className="block text-sm text-rose-600">Disables the platform for non-admin users. Use with caution.</span>
                                    </div>
                                </label>

                            </div>
                        </div>

                    </div>

                    <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? "Saving Changes..." : "Save Settings"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
