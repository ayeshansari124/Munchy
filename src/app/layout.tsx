import "./globals.css";
import { Nunito } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "MunchY - Food Delivery",
  description: "Food delivery platform",
};

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="max-w-6xl mx-auto">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>

        <Toaster position="top-center" />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </html>
  );
}
