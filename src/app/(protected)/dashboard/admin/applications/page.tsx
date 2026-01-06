'use client'

import { useState, useEffect } from "react";
import { Search, Briefcase, Calendar, Trash2, Download, CheckCircle, XCircle, Clock, ChevronUp, ChevronDown } from "lucide-react";

interface ApplicationData {
    id: string;
    userId: string;
    internshipJobId: string;
    status: "applied" | "selected" | "rejected";
    appliedAt: string;
}

type SortField = 'id' | 'userId' | 'internshipJobId' | 'status' | 'appliedAt';
type SortOrder = 'asc' | 'desc';

export default function ApplicationManagement() {
    const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
    const [filteredData, setFilteredData] = useState<ApplicationData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState<SortField>('appliedAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

        // Sort data
        filtered.sort((a, b) => {
            let aVal: string | number = a[sortField];
            let bVal: string | number = b[sortField];

            if (sortField === 'appliedAt') {
                aVal = new Date(aVal).getTime();
                bVal = new Date(bVal).getTime();
            }

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchTerm, filterStatus, applicationData, sortField, sortOrder]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

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
            case "applied": return <Clock size={14} />;
            case "selected": return <CheckCircle size={14} />;
            case "rejected": return <XCircle size={14} />;
            default: return <Clock size={14} />;
        }
    };

    const toggleRowSelection = (id: string) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const toggleAllRows = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
        } else {
            setSelectedRows(new Set(paginatedData.map(app => app.id)));
        }
    };

    const handleBulkStatusChange = async (newStatus: 'applied' | 'selected' | 'rejected') => {
        if (selectedRows.size === 0) {
            alert('Please select at least one application');
            return;
        }

        if (!confirm(`Update ${selectedRows.size} application(s) to ${newStatus}?`)) {
            return;
        }

        try {
            for (const id of Array.from(selectedRows)) {
                await handleStatusChange(id, newStatus);
            }
            setSelectedRows(new Set());
        } catch (error) {
            console.error('Error in bulk update:', error);
        }
    };

    // Pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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

                {/* Filters and Actions */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                    {/* Bulk Actions */}
                    {selectedRows.size > 0 && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">
                                {selectedRows.size} selected
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleBulkStatusChange('selected')}
                                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    Mark Selected
                                </button>
                                <button
                                    onClick={() => handleBulkStatusChange('rejected')}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Mark Rejected
                                </button>
                                <button
                                    onClick={() => handleBulkStatusChange('applied')}
                                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Mark Applied
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rows per page:</span>
                            <select
                                value={rowsPerPage}
                                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <Download size={16} />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                            onChange={toggleAllRows}
                                            className="rounded border-gray-300"
                                        />
                                    </th>
                                    <th 
                                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Application ID
                                            {sortField === 'id' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('userId')}
                                    >
                                        <div className="flex items-center gap-1">
                                            User ID
                                            {sortField === 'userId' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('internshipJobId')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Job ID
                                            {sortField === 'internshipJobId' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Status
                                            {sortField === 'status' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('appliedAt')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Applied At
                                            {sortField === 'appliedAt' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            <Briefcase size={48} className="mx-auto text-gray-400 mb-2" />
                                            No applications found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((application) => (
                                        <tr 
                                            key={application.id}
                                            className={`hover:bg-gray-50 transition ${selectedRows.has(application.id) ? 'bg-blue-50' : ''}`}
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.has(application.id)}
                                                    onChange={() => toggleRowSelection(application.id)}
                                                    className="rounded border-gray-300"
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-900">
                                                {application.id.slice(0, 12)}...
                                            </td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-900">
                                                <a
                                                    href={`/user/${application.userId}`}
                                                    target="_blank"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {application.userId.slice(0, 12)}...
                                                </a>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-mono text-gray-900">
                                                <a
                                                    href={`/internships/${application.internshipJobId}`}
                                                    target="_blank"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {application.internshipJobId.slice(0, 12)}...
                                                </a>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(application.status)}`}>
                                                    {getStatusIcon(application.status)}
                                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {new Date(application.appliedAt).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={application.status}
                                                    onChange={(e) => handleStatusChange(application.id, e.target.value as any)}
                                                    className="text-sm px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <option value="applied">Applied</option>
                                                    <option value="selected">Selected</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} results
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-1 border rounded text-sm ${
                                                currentPage === pageNum
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}