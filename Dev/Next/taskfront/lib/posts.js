import axios from "axios";

export async function getAllPostsData() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = res.data;
  const filteredPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filteredPosts;
}

//idの取得
export async function getAllpostIds() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = res.data;
  return posts.map((post) => {
    return {
      params: { id: String(post.id) },
    };
  });
}

//idに基づいた詳細ページを取得

export async function getPostData(id) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`
  );
  const post = res.data;
  return post;
}
