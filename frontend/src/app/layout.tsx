export const metadata = {
  title: "OpenClaw Command Center",
  description: "AI-Powered Digital Empire Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-900 text-gray-100">{children}</body>
    </html>
  );
}
