import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import Image from "next/image";
import image  from '../public/images/liked.png'
export default function Home() {
  return (
    <div
      className="bg-neutral-900
    rounded-lg
    h-full
    w-full 
    overflow-hidden
    overflow-y-auto"
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-white font-semibold text-3xl">Welcome Back</h1>
          <div
            className="
            grid 
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          "
          >
            <ListItem
             image='/images/liked.png' href="liked" name="Liked Songs"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-semibold text-2xl">
            Newest Songs
          </h1>
        </div>
      </div>
    </div>
  );
}
