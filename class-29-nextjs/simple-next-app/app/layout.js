export const metadata = { title: "Simple Next App" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#f5f7fa" }}>
        {children}
      </body>
    </html>
  );
}
