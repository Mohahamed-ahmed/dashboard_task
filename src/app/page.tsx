"use client";

// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
import AnalyticsTable from "@/components/pages/analytics-table";
import MyChart from "@/components/pages/chart";
// import { User } from "./analytics/page";
import { useRouter } from "next/navigation";

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const usersData: User[] = [
  { id: 1, name: "Mohamed Ahmed", email: "mohamed@example.com", age: 25 },
  { id: 2, name: "Sara Ali", email: "sara@example.com", age: 22 },
  { id: 3, name: "Omar Hassan", email: "omar@example.com", age: 28 },
  { id: 4, name: "Mona Salah", email: "mona@example.com", age: 30 },
  { id: 5, name: "Ahmed Youssef", email: "ahmed@example.com", age: 27 },
  { id: 6, name: "Laila Fathi", email: "laila@example.com", age: 24 },
  { id: 7, name: "Karim Nabil", email: "karim@example.com", age: 29 },
];

export default function Home() {
  // const router = useRouter();

  // const user = useSelector((state: RootState) => state.auth);

  // if(!user.displayName) {
  //   router.push("/auth/sign-up");
  // }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                Dashboard Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, <span className="font-semibold text-blue-600">
                  {/* {user?.displayName || 'Guest User'} */}
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          <section className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-3 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                User Analytics Table
              </h2>
              <p className="mt-1 text-sm text-gray-600 hidden sm:block">
                Manage and analyze user data with filtering, sorting, and export capabilities
              </p>
            </div>
            <AnalyticsTable usersData={usersData} />
          </section>

          <section className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-3 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Data Visualization
              </h2>
              <p className="mt-1 text-sm text-gray-600 hidden sm:block">
                Visual representation of user demographics and trends
              </p>
            </div>
            <MyChart usersData={usersData} />
          </section>
        </div>
      </main>
    </div>
  );
}
