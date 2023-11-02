"use client";
import { useRouter } from "next/navigation";
import MediaItem from "@/components/MediaItem";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useEffect } from "react";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
 
interface LikedContentProps {
    songs: Song[]
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="text-neutral-400 flex flex-col gap-y-2 w-full px-6">
        No Liked Songs !!
      </div>
    );
  }
  return (
    <div>
      {songs.map((song:any) => (
        <div className="flex items-center gap-x-4 w-full" key={song.id}>
          <div className="flex-1">
            <MediaItem onClick={(id:string) => onPlay(id)} data={song} />
          </div>
            <LikeButton songId={song.id}/>
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
