import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import Filter from "./Filter";
const inter = Inter({ subsets: ["latin"] });

async function getData() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <main className="flex items-center justify-between h-full min-h-screen p-24">
      <div className="w-full h-full max-w-xs bg-red-300">1</div>
      <div className="flex-auto h-full bg-blue-300">
        <Filter />
      </div>
    </main>
  );
}
