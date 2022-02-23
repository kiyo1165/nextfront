import React from "react";
import Link from "next/link";

function Post({ post }) {
  return (
    <div>
      <span>{post.id}</span>
      {" : "}
      <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
        <Link href={`/posts/${post.id}`}>{post.title}</Link>
      </span>
    </div>
  );
}

export default Post;
