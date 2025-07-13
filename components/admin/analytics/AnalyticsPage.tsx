"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { formatNaira } from "@/lib/format";
import {
  User as UserIcon,
  PackageCheck,
  DollarSign,
  Boxes,
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  orderStatusOverview: {
    pending: number;
    paid: number;
    delivered: number;
    cancelled: number;
  };
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
}

interface UserData {
  name: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const AnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/api/admin/analytics");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/admin/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchAnalytics();
    fetchUser();
  }, []);

  if (!data) {
    return <div className="p-4 text-gray-500">Loading analytics...</div>;
  }

  const kpis = [
    {
      label: "Total Users",
      value: data.totalUsers,
      icon: <UserIcon className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-100",
    },
    {
      label: "Total Orders",
      value: data.totalOrders,
      icon: <PackageCheck className="w-6 h-6 text-yellow-500" />,
      bg: "bg-yellow-100",
    },
    {
      label: "Total Revenue",
      value: `${formatNaira(data.totalRevenue)}`,
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      bg: "bg-green-100",
    },
    {
      label: "Total Products",
      value: data.totalProducts,
      icon: <Boxes className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-100",
    },
  ];

  const statusData = {
    labels: ["Pending", "Paid", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [
          data.orderStatusOverview?.pending ?? 0,
          data.orderStatusOverview?.paid ?? 0,
          data.orderStatusOverview?.delivered ?? 0,
          data.orderStatusOverview?.cancelled ?? 0,
        ],
        backgroundColor: ["#facc15", "#22c55e", "#3b82f6", "#ef4444"],
      },
    ],
  };

  const revenueData = {
    labels: data.monthlyRevenue.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: data.monthlyRevenue.map((item) => item.revenue),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* GREETING */}
      <div>
        <p className="text-xl font-semibold text-gray-800">
          {getGreeting()} {user?.name?.split(" ")[0] || "Admin"}, welcome back
          👋
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <div className={`p-3 rounded-full ${kpi.bg}`}>{kpi.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Order Status Overview</h2>
          <div className="h-[300px]">
            <Pie
              data={statusData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      boxWidth: 12,
                      padding: 10,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <div className="h-[300px]">
            <Bar data={revenueData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
