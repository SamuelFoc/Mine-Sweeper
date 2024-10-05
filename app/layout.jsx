import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-950 w-screen h-screen flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
