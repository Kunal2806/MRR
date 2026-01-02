'use client'

import { useState, useEffect } from "react";
import { Search, Briefcase, Calendar, Trash2, Eye, Download, CheckCircle, XCircle, Clock } from "lucide-react";

interface ApplicationData {
    id: string;
    userId: string;
    internshipJobId: string;
    status: "applied" | "selected" | "rejected";
    appliedAt: string;
}

export default function ApplicationManagement() {
    const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
    const [filteredData, setFilteredData] = useState<ApplicationData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/admindashboard/applications');
            const result = await response.json();
            setApplicationData(result);
            setFilteredData(result);
        } catch (error) {
            console.error('Error fetching application data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = applicationData;

        if (searchTerm) {
            filtered = filtered.filter(app =>
                app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.internshipJobId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== "all") {
            filtered = filtered.filter(app => app.status === filterStatus);
        }

        setFilteredData(filtered);
        setSelectedApplication(null);
    }, [searchTerm, filterStatus, applicationData]);

    const handleStatusChange = async (id: string, newStatus: 'applied' | 'selected' | 'rejected') => {
        try {
            const response = await fetch('/api/admindashboard/applications', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    status: newStatus
                })
            });
            const result = await response.json();
            alert(result.message);
            await fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    // const handleDelete = async (id: string) => {
    //     if (confirm("Are you sure you want to delete this application?")) {
    //         try {
    //             const response = await fetch('/api/admindashboard/contact', {
    //                 method: "DELETE",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({ id })
    //             });
    //             const result = await response.json();
    //             alert(result.message);
    //             setSelectedApplication(null);
    //             await fetchData();
    //         } catch (error) {
    //             console.error('Error deleting application:', error);
    //             alert('Failed to delete application');
    //         }
    //     }
    // };

    const exportToCSV = () => {
        const headers = ["ID", "User ID", "Internship/Job ID", "Status", "Applied At"];
        const rows = filteredData.map(app => [
            app.id,
            app.userId,
            app.internshipJobId,
            app.status,
            app.appliedAt
        ]);
        
        const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "applications.csv";
        a.click();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "applied": return "bg-blue-100 text-blue-800";
            case "selected": return "bg-green-100 text-green-800";
            case "rejected": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "applied": return <Clock size={16} />;
            case "selected": return <CheckCircle size={16} />;
            case "rejected": return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading applications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Management</h1>
                    <p className="text-gray-600">Manage internship and job applications</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Total Applications</div>
                        <div className="text-2xl font-bold text-gray-900">{applicationData.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Applied</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {applicationData.filter(app => app.status === "applied").length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Selected</div>
                        <div className="text-2xl font-bold text-green-600">
                            {applicationData.filter(app => app.status === "selected").length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Rejected</div>
                        <div className="text-2xl font-bold text-red-600">
                            {applicationData.filter(app => app.status === "rejected").length}
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by ID, User ID, or Job ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="applied">Applied</option>
                                <option value="selected">Selected</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Application List */}
                    <div className="lg:col-span-2 space-y-4">
                        {filteredData.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600">No applications found</p>
                            </div>
                        ) : (
                            filteredData.map((application) => (
                                <div
                                    key={application.id}
                                    className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer ${
                                        selectedApplication?.id === application.id ? "ring-2 ring-blue-500" : ""
                                    }`}
                                    onClick={() => setSelectedApplication(application)}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                Application {application.id.slice(0, 8)}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                User: {application.userId.slice(0, 12)}...
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(application.status)}`}>
                                                    {getStatusIcon(application.status)}
                                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(application.appliedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={14} />
                                            Job: {application.internshipJobId.slice(0, 12)}...
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(application.appliedAt).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-1">
                        {selectedApplication ? (
                            <div className="bg-white p-6 rounded-lg shadow sticky top-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
                                    {/* <button
                                        onClick={() => handleDelete(selectedApplication.id)}
                                        className="text-red-600 hover:text-red-700 transition"
                                    >
                                        <Trash2 size={20} />
                                    </button> */}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Application ID</label>
                                        <p className="text-gray-900 mt-1 text-sm font-mono break-all">{selectedApplication.id}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">User ID</label>
                                        <p className="text-gray-900 mt-1 text-sm font-mono break-all">{selectedApplication.userId}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Internship/Job ID</label>
                                        <p className="text-gray-900 mt-1 text-sm font-mono break-all">{selectedApplication.internshipJobId}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Applied At</label>
                                        <p className="text-gray-900 mt-1">
                                            {new Date(selectedApplication.appliedAt).toLocaleString()}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Status</label>
                                        <select
                                            value={selectedApplication.status}
                                            onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value as any)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="applied">Applied</option>
                                            <option value="selected">Selected</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <Eye size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600">Select an application to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}