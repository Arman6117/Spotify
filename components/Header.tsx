"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import Button from "./Button";
import toast from "react-hot-toast";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();
  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO:RESET ANY PLAYING SONG
    router.refresh();

    if (error) {
      toast.error(error.message);
    }else{
      toast.success('Logged Out')
    }
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div
        className="
        w-full
        mb-4
        flex
        items-center
        justify-between
        "
      >
        <div
          className="
         hidden
         md:flex
         gap-x-2
         items-center
        "
        >
          <button
            onClick={() => router.back()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover: opacity-75
              transition
            "
          >
            <RxCaretLeft className="text-right" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              rounded-full
              bg-black
              flex
              items-center
              justify-center
              hover: opacity-75
              transition
            "
          >
            <RxCaretRight className="text-right" size={35} />
          </button>
        </div>
        <div
          className="
         flex 
         md:hidden
         gap-x-2
         items-center
        "
        >
          <button onClick={()=> router.push('/')} className="p-2 bg-white rounded-full items-center justify-center hover:opacity-75 transition flex">
            <HiHome className="text-black" size={20} />
          </button>
          <button onClick={()=> router.push('/search')} className="p-2 bg-white rounded-full items-center justify-center hover:opacity-75 transition flex">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-center items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                className="bg-white "
                // onClick={() => router.push("/account")}
              >
                <FaUserAlt/>
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={authModal.onOpen}
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white text px-6 py-2"
                  onClick={authModal.onOpen}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
