import Filter from "@/components/home/Filter";
import Viewer from "@/components/home/ListViewer";

export default async function Home() {
  return (
    <>
      <Filter />
      <Viewer />
    </>
  );
}
