// app/layout.tsx
import "./globals.css"; // <-- Yeh line saara jadoo wapas layegi!

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}