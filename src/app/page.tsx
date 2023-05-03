import Filter from "@/components/Filter";
import Viewer from "@/components/Viewer";

export default async function Home() {
  return (
    <main className="flex items-center justify-between h-full min-h-screen ">
      <div className="w-full h-full max-w-md">
        <Filter />
      </div>
      <div className="flex-auto h-full overflow-auto">
        <Viewer />
      </div>
    </main>
  );
}
