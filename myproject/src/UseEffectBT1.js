import React, { useState } from "react";

export default function UseEffectBT1() {
  const [list, setList] = useState([
    {
      id: 1,
      name: "Linh",
      age: 26,
    },
    {
      id: 2,
      name: "Nhân",
      age: 27,
    },
    {
      id: 3,
      name: "Phúc",
      age: 28,
    },
  ]);

  const [isEdit, setIsEdit] = useState(false);

  const [newStudent, setNewStudent] = useState({
    id: -1,
    name: "",
    age: 0,
  });

  const handleStudentChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    const studentToAdd = {
      ...newStudent,
      id: list.length + 1,
    };

    setList((prevState) => [...prevState, studentToAdd]);

    setNewStudent({
      id: -1,
      name: "",
      age: 0,
    });
  };

  const handleEditClick = (id) => {
    setIsEdit(true);
    let studentEdit = list.find((item) => item.id === id);

    setNewStudent({ ...studentEdit });
  };

  const handleEditStudent = () => {
    setList((prevState) =>
      prevState.map((student) =>
        student.id === newStudent.id ? newStudent : student
      )
    );

    setNewStudent({
      id: -1,
      name: "",
      age: 0,
    });
  };

  const handleRemoveClick = (id) => {
    setList((prevState) =>
      prevState.filter((student) => student.id !== id)
    );
  };

  return (
    <>
      <input
        placeholder="Name"
        name="name"
        type="text"
        value={newStudent.name}
        onChange={(event) => {
          handleStudentChange(event);
        }}
      />
      <input
        placeholder="Age"
        type="number"
        name="age"
        value={newStudent.age}
        onChange={(event) => {
          handleStudentChange(event);
        }}
      />
      {!isEdit ? (
        <button onClick={handleAddStudent}>Add</button>
      ) : (
        <button onClick={handleEditStudent}>Edit</button>
      )}
      <table border={1}>
        <tbody>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Age</td>
            <td colSpan={2}>Action</td>
          </tr>
          {list.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => handleEditClick(student.id)}>
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => handleRemoveClick(student.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
