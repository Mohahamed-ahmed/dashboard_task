"use client";

import React from "react";
import { User } from "../../app/page";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function MyChart({ usersData }: { usersData: User[] }) {
  return (
    <div className="p-3 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="text-sm sm:text-base">Age Distribution</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="age" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4" />
            </svg>
            <span className="text-sm sm:text-base">Age Trend</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey="age" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 1, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
          <div className="text-blue-600 text-xs sm:text-sm font-medium">Total Users</div>
          <div className="text-lg sm:text-2xl font-bold text-blue-900">{usersData.length}</div>
        </div>
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
          <div className="text-green-600 text-xs sm:text-sm font-medium">Average Age</div>
          <div className="text-lg sm:text-2xl font-bold text-green-900">
            {Math.round(usersData.reduce((sum, user) => sum + (user.age ?? Infinity), 0) / usersData.length)}
          </div>
        </div>
        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
          <div className="text-purple-600 text-xs sm:text-sm font-medium">Youngest</div>
          <div className="text-lg sm:text-2xl font-bold text-purple-900">
            {Math.min(...usersData.map(user => user.age ?? Infinity))}
          </div>
        </div>
        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
          <div className="text-orange-600 text-xs sm:text-sm font-medium">Oldest</div>
          <div className="text-lg sm:text-2xl font-bold text-orange-900">
            {Math.max(...usersData.map(user => user.age ?? -Infinity))}
          </div>
        </div>
      </div>
    </div>
  );
}
