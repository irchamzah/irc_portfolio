"use client";
import { deletePost } from "@/lib/actions/post.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function DeletePost({
  postId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: {
  postId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  if (currentUserId !== authorId) return null;

  return (
    <Image
      src="/assets/delete.svg"
      alt="Delete"
      width={18}
      height={18}
      className="cursor-pointer object-cover"
      onClick={async () => {
        deletePost(JSON.parse(postId), pathname);
        if (!parentId || !isComment) {
          router.push("/");
        }
      }}
    />
  );
}

export default DeletePost;
