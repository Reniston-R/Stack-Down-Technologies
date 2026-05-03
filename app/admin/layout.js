export const metadata = {
  title: "Action Tech Wave | Unified Admin",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/chart.js" async></script>
      {children}
    </>
  );
}
