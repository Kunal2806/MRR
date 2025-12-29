'use client'

import { useState, useEffect } from "react";
import { Search, Mail, Phone, User, Calendar, Filter, Trash2, Eye, Download } from "lucide-react";

interface ContactData {
    id: string;
    userId: string;
    fullname: string;
    email: string;
    number: string;
    querytype: 'Event Query' | 'Mentorship Help' | 'Internship Support' | 'Partnership' | 'Other';
    message: string;
    createdAt?: string;
    status?: 'new' | 'read' | 'resolved';
}

export default function Contact() {
    const [contactData, setContactData] = useState<ContactData[]>([]);
    const [filteredData, setFilteredData] = useState<ContactData[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [selectedContact, setSelectedContact] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const response = await fetch('/api/admindashboard/contact');
        const result = await response.json(); 
        setContactData(result);
        setFilteredData(result);
        setLoading(false);
    }
    // Mock data - replace with actual API call
    useEffect(() => {
        // const mockData: ContactData[] = [
        //     {
        //         id: "1",
        //         userId: "user_001",
        //         fullname: "Sarah Johnson",
        //         email: "sarah.j@example.com",
        //         number: "+1 234-567-8900",
        //         querytype: "Event Query",
        //         message: "I'm interested in learning more about upcoming tech events and workshops you're organizing.",
        //         createdAt: "2024-12-28T10:30:00",
        //         status: "new"
        //     },
        //     {
        //         id: "2",
        //         userId: "user_002",
        //         fullname: "Michael Chen",
        //         email: "m.chen@example.com",
        //         number: "+1 234-567-8901",
        //         querytype: "Mentorship Help",
        //         message: "Looking for guidance on career transition into software development. Would appreciate any mentorship opportunities.",
        //         createdAt: "2024-12-27T14:20:00",
        //         status: "read"
        //     },
        //     {
        //         id: "3",
        //         userId: "user_003",
        //         fullname: "Priya Sharma",
        //         email: "priya.sharma@example.com",
        //         number: "+91 98765 43210",
        //         querytype: "Internship Support",
        //         message: "I'm a final year CS student seeking internship opportunities. Can you guide me on available positions?",
        //         createdAt: "2024-12-26T09:15:00",
        //         status: "resolved"
        //     },
        //     {
        //         id: "4",
        //         userId: "user_004",
        //         fullname: "David Martinez",
        //         email: "david.m@company.com",
        //         number: "+1 234-567-8902",
        //         querytype: "Partnership",
        //         message: "Our company is interested in exploring partnership opportunities for joint tech initiatives.",
        //         createdAt: "2024-12-25T16:45:00",
        //         status: "new"
        //     }
        // ];
        setLoading(true)
        
        fetchData();
    }, []);

    // Filter and search logic
    useEffect(() => {
        let filtered = contactData;

        if (searchTerm) {
            filtered = filtered.filter(contact =>
                contact.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterType !== "all") {
            filtered = filtered.filter(contact => contact.querytype === filterType);
        }

        if (filterStatus !== "all") {
            filtered = filtered.filter(contact => contact.status === filterStatus);
        }

        setFilteredData(filtered);
        setSelectedContact(null);
    }, [searchTerm, filterType, filterStatus, contactData]);

    const handleStatusChange = (id: string, newStatus: 'new' | 'read' | 'resolved') => {
        const updateData = async() => {
            const response = await fetch('/api/admindashboard/contact', {
                method: "PUT",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id,
                    status: newStatus
                })
            })
            const result = await response.json();
            alert(result.message);
        }
        updateData();
        // setSelectedContact(null);
        fetchData();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this contact?")) {
            // setContactData(prev => prev.filter(contact => contact.id !== id));
            const response = await fetch('/api/admindashboard/contact', {
                method: "DELETE",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id
                })
            })
            const result = await response.json();
            alert(result.message);
            setSelectedContact(null);
            fetchData();    
        }
    };

    const exportToCSV = () => {
        const headers = ["ID", "Name", "Email", "Phone", "Query Type", "Message", "Status", "Date"];
        const rows = filteredData.map(c => [
            c.id,
            c.fullname,
            c.email,
            c.number,
            c.querytype,
            c.message.replace(/,/g, ";"),
            c.status || "new",
            c.createdAt || ""
        ]);
        
        const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contacts.csv";
        a.click();
    };

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-800";
            case "read": return "bg-yellow-100 text-yellow-800";
            case "resolved": return "bg-green-100 text-green-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getQueryTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            "Event Query": "bg-purple-100 text-purple-800",
            "Mentorship Help": "bg-blue-100 text-blue-800",
            "Internship Support": "bg-green-100 text-green-800",
            "Partnership": "bg-orange-100 text-orange-800",
            "Other": "bg-gray-100 text-gray-800"
        };
        return colors[type] || "bg-gray-100 text-gray-800";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading contacts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
                    <p className="text-gray-600">Manage and respond to contact inquiries</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Total Contacts</div>
                        <div className="text-2xl font-bold text-gray-900">{contactData.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">New</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {contactData.filter(c => c.status === "new").length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">In Progress</div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {contactData.filter(c => c.status === "read").length}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-sm text-gray-600 mb-1">Resolved</div>
                        <div className="text-2xl font-bold text-green-600">
                            {contactData.filter(c => c.status === "resolved").length}
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or message..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Query Types</option>
                                <option value="Event Query">Event Query</option>
                                <option value="Mentorship Help">Mentorship Help</option>
                                <option value="Internship Support">Internship Support</option>
                                <option value="Partnership">Partnership</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="resolved">Resolved</option>
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
                    {/* Contact List */}
                    <div className="lg:col-span-2 space-y-4">
                        {filteredData.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600">No contacts found</p>
                            </div>
                        ) : (
                            filteredData.map((contact) => (
                                <div
                                    key={contact.id}
                                    className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer ${
                                        selectedContact?.id === contact.id ? "ring-2 ring-blue-500" : ""
                                    }`}
                                    onClick={() => setSelectedContact(contact)}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {contact.fullname}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQueryTypeColor(contact.querytype)}`}>
                                                    {contact.querytype}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                                                    {contact.status || "new"}
                                                </span>
                                            </div>
                                        </div>
                                        {contact.createdAt && (
                                            <span className="text-xs text-gray-500">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{contact.message}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Mail size={14} />
                                            {contact.email}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Phone size={14} />
                                            {contact.number}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-1">
                        {selectedContact ? (
                            <div className="bg-white p-6 rounded-lg shadow sticky top-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                                    <button
                                        onClick={() => handleDelete(selectedContact.id)}
                                        className="text-red-600 hover:text-red-700 transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                                        <p className="text-gray-900 mt-1">{selectedContact.fullname}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <p className="text-gray-900 mt-1">{selectedContact.email}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <p className="text-gray-900 mt-1">{selectedContact.number}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Query Type</label>
                                        <p className="text-gray-900 mt-1">{selectedContact.querytype}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Message</label>
                                        <p className="text-gray-900 mt-1">{selectedContact.message}</p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 block mb-2">Status</label>
                                        <select
                                            value={selectedContact.status || "new"}
                                            onChange={(e) => handleStatusChange(selectedContact.id, e.target.value as any)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow text-center">
                                <Eye size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600">Select a contact to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}