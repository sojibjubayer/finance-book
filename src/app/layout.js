"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/services/AuthProvider";
import { Provider } from "react-redux";
import store from "@/redux/store/store";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Finance Tracker",
//   description: "Your Personal Finance Tracker",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <Provider store={store}>
            <Navbar />
            {children}
            <Footer />
          </Provider>
        </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
