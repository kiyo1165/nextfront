import { getAllpostIds, getPostData } from "../../lib/posts";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

export default function Post({ post }) {
  const router = useRouter();

  //新しい動的ファイルが作成される時isFallbackはtrueとなる。
  if (router.isFallback || !post) {
    return <div>Loding...</div>;
  }
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-4 text-xl font-bold">{post.title}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span> back to blog page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllpostIds();
  return {
    paths,
    fallback: true,
  };
}

//paramsでpathsを受け取り、詳細ページを取得
export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);
  return {
    props: { post },
    revalidate: 3, //postの内容を更新する頻度を3秒で指定している(incremental static regeneration)
  };
}
