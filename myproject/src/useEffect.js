import axios from "axios";
import { useEffect, useState } from "react";

export function UseEffect() {
  let [list, setList] = useState([]);

  const getData = () => {
    axios.get("https://dummyjson.com/todos").then((res) => {
      setList(res.data.todos);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <table border={1}>
        <tr>
          <td>Id</td>
          <td>ToDo</td>
          <td>Completed</td>
          <td>UserId</td>
        </tr>
        {list.map((item) => (
          <tr>
            <td>{item.id}</td>
            <td>{item.todo}</td>
            <td>{item.completed + ""}</td>
            <td>{item.userId}</td>
          </tr>
        ))}
      </table>
    </>
  );
}
