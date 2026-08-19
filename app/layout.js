import "./globals.css";

export const metadata = {
  title: "Stack Down Technologies | SaaS & Digital Solutions",
  description: "Transforming ideas into digital reality. Stack Down Technologies provides comprehensive digital solutions for small to high businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Afacad+Flux:wght@100..1000&family=Outfit:wght@300;400;600;800&family=Raleway:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
