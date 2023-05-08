import Filter from "@/components/Filter";
import Sidebar from "@/components/Sidebar";
import SidebarButton from "@/components/SidebarButton";
import Viewer from "@/components/Viewer";

export default async function Home() {
  return (
    <main className="w-full h-full max-w-screen max-h-screen flex flex-col relative overflow-hidden">
      <Filter />
      <Viewer />
    </main>
  );
}
