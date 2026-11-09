import "./globals.css";

export const metadata = {
  title: "Student Management System",
  description: "Next.js, Tailwind CSS, MongoDB ও Mongoose দিয়ে তৈরি CRUD অ্যাপ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
