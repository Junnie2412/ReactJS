import { useState } from "react";

export function Home(props) {
  let [name, setName] = useState("");
  let [list, setList] = useState([
    {
        id: 1,
        name: "Dung"
    },
    {
        id: 2,
        name: "Han"
    }
  ])

  const changeName = (event) => {
    setName(event.target.value)
  }
  return(
    <>
    <input onChange={(event) => {changeName(event)}} placeholder="Name"/>
    <div>Hello {name}</div>
    <div>{props.data} + {props.data1}</div>
    {list.map((item) => (
        <h3>Id: {item.id} Name: {item.name}</h3>
    ))}
    </>
  )
}
