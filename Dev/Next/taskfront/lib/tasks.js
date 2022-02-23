import axios from "axios";

export async function getAllTasksData() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );
  const tasks = res.data;
  const filteredTasks = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return filteredTasks;
}

//idの取得
export async function getAllTaskIds() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );
  const tasks = res.data;
  return tasks.map((task) => {
    return {
      params: { id: String(task.id) },
    };
  });
}

//idに基づいた詳細ページを取得
export async function getTaskData(id) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`
  );
  const post = res.data;
  return post;
}
