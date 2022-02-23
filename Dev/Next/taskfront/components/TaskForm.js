import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookies from "universal-cookie";
import axios from "axios";

import React from "react";

const cookie = new Cookies();

function TaskForm({ taskCreated }) {
  const { selectedTask, setSelectedTask } = useContext(StateContext);
  const create = async (e) => {
    e.preventDefault();
    const data = { title: selectedTask.title };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/task/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
      setSelectedTask({ id: 0, title: "" });
      //キャッシュの更新
      taskCreated();
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    const data = { title: selectedTask.title };
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/task/${selectedTask.id}/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookie.get("access_token")}`,
          },
        }
      );
      if (res.status === 401) {
        alert("JWT Token not valid");
      }
      setSelectedTask({ id: 0, title: "" });
      //キャッシュの更新
      taskCreated();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
