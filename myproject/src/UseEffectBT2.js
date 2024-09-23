import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UseEffectBT2() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/images/search?limit=10")
      .then((res) => {
        setList(res.data);
      });
  }, []);

  return (
    <>
      <table border={1}>
        <tbody>
          <tr>
            <td>Id</td>
            <td>Url</td>
            <td>Width</td>
            <td>Height</td>
          </tr>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.url}</td>
              <td>{item.width}</td>
              <td>{item.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
