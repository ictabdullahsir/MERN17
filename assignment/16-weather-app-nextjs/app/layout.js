import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Weather App",
  description: "Open-Meteo ব্যবহার করে তৈরি একটি Simple Weather App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="flex min-h-screen flex-col bg-sky-50 text-slate-800">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
