// src/app/layout.jsx
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "School Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex">
          {/* Sidebar (client component) */}
          <Sidebar />

          {/* Main content */}
          <main className="flex-1 bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
