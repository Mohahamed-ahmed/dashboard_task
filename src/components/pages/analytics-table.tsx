"use client";

import React, { useState, useMemo } from "react";
import { User } from "../../app/page";
import { exportToPDF } from "./exportToPdf";
import { exportToExcel } from "./exportToExcel";

export default function AnalyticsTable({ usersData }: { usersData: User[] }) {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<keyof User>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 3;

    const filteredData = useMemo(() => {
        return usersData.filter((user) =>
            (user.name ?? '').toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if ((a[sortField] ?? '') < (b[sortField] ?? '')) return sortOrder === "asc" ? -1 : 1;
            if ((a[sortField] ?? '') > (b[sortField] ?? '')) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortField, sortOrder]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (field: keyof User) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <div className="p-3 sm:p-6">
            <div className="flex flex-col gap-4 mb-6">
                <div className="w-full">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                        Search Users
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by name..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                
                <div className="flex xs:flex-row gap-2">
                    <button
                        onClick={() => exportToExcel(usersData)}
                        className=" xs:flex-initial inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors duration-200 shadow-sm text-sm cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden xs:inline">Export </span>Excel
                    </button>

                    <button
                        onClick={() => exportToPDF(usersData)}
                        className=" xs:flex-initial inline-flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-200 shadow-sm text-sm cursor-pointer"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden xs:inline">Export </span>PDF
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("name")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Name</span>
                                    {sortField === "name" && (
                                        <span className="text-blue-600">
                                            {sortOrder === "asc" ? "↑" : "↓"}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("email")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Email</span>
                                    {sortField === "email" && (
                                        <span className="text-blue-600">
                                            {sortOrder === "asc" ? "↑" : "↓"}
                                        </span>
                                    )}
                                </div>
                            </th>
                            <th
                                className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleSort("age")}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Age</span>
                                    {sortField === "age" && (
                                        <span className="text-blue-600">
                                            {sortOrder === "asc" ? "↑" : "↓"}
                                        </span>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 sm:px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-500 sm:hidden truncate max-w-[120px]">
                                        {user.email}
                                    </div>
                                </td>
                                <td className="hidden sm:table-cell px-3 sm:px-6 py-4">
                                    <div className="text-sm text-gray-600 truncate max-w-[200px]">{user.email}</div>
                                </td>
                                <td className="px-3 sm:px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {user.age}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-4 mt-6">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                    <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, sortedData.length)}
                    </span>{" "}
                    of <span className="font-medium">{sortedData.length}</span> results
                </div>
                
                <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">Prev</span>
                    </button>
                    
                    <div className="flex items-center space-x-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let page;
                            if (totalPages <= 5) {
                                page = i + 1;
                            } else if (currentPage <= 3) {
                                page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i;
                            } else {
                                page = currentPage - 2 + i;
                            }
                            
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors flex-shrink-0 ${
                                        page === currentPage
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>
                    
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
