import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTasksData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

//公式：https://swr.vercel.app/ja/docs/getting-started
//SWRはフェッチをクライアント側で行い、データをリアルタイムに更新する事ができる。
//そのためブラウザでjavascriptをoffにすると更新されたデータは表示されなくなる。
//SWRのプロパティの定数
//引数urlはswr関数で渡される定数apiUrl
const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

export default function TaskPage({ staticfillteredTasks }) {
  //fallbackDataはdataへ格納。 mutateはreturn内で使用が可能。
  const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
    //ビルド時のデータを初期値としてfallbackDataに格納
    fallbackData: staticfillteredTasks,
  });
  //swrで更新されたtasksデータをソートして表示
  const fillteredTasks = tasks?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  //タスクページがマウントされた時にswrが確実に実行させるためにuseEffectを実行し、mutate()でフェッチを実行
  useEffect(() => {
    mutate();
  }, []);

  return (
    <StateContextProvider>
      <Layout title="Task Page">
        <TaskForm taskCreated={mutate} />
        <ul>
          {fillteredTasks &&
            fillteredTasks.map((task) => (
              //deleteTask:削除した後にキャッシュを更新するためにmutateを渡している
              <Task key={task.id} task={task} deletedTask={mutate} />
            ))}
        </ul>
        <Link href="/main-page">
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
            <span>Back to main page</span>
          </div>
        </Link>
      </Layout>
    </StateContextProvider>
  );
}
//ビルド時にデータをフェッチ
export async function getStaticProps() {
  const staticfillteredTasks = await getAllTasksData();
  return {
    props: { staticfillteredTasks },
    revalidate: 3,
  };
}
