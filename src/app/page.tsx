import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello World</h1>
        <Link href="/tests/1"> Test 시작하기 </Link>
        {/* <Link href="/users"> Users Page </Link> */}
        {/* <ProductCard /> */}
      </main>
    </div>
  );
}
