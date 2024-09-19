import React from "react";

export class BaiTap extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [
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
      ],
      tempStudent: {
        id: -1,
        name: "",
        age: 0,
      },
      isEdit: false,
    };
  }

  handleChangeStudent = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => ({
      tempStudent: {
        ...prevState.tempStudent,
        [name]: value,
      },
    }));
  };

  hanldeAddStudent = () => {
    let newStudent = {
      id: this.state.list.length + 1,
      name: this.state.tempStudent.name,
      age: this.state.tempStudent.age,
    };

    this.setState((prevState) => ({
      list: [...prevState.list, newStudent],
      tempStudent: {
        id: -1,
        name: "",
        age: 0,
      },
    }));
  };

  hanldeDeleteStudent = (id) => {
    this.setState({
      list: this.state.list.filter((student) => student.id !== id),
    });
  };

  hanldeEditStudent = (id) => {
    let student = this.state.list.find((item) => item.id === id);

    this.setState((prevState) => ({
      tempStudent: { ...student },
      isEdit: !prevState.isEdit,
    }));
  };

  hanldeUpdateStudent = () => {
    this.setState((prevState) => ({
      list: prevState.list.map((student) =>
        student.id === prevState.tempStudent.id
          ? prevState.tempStudent
          : student
      ),
      tempStudent: {
        id: -1,
        name: "",
        age: 0,
      },
      isEdit: false,
    }));
  };

  render() {
    return (
      <>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={this.state.tempStudent.name || ""}
            style={{ padding: 5, margin: 10 }}
            onChange={this.handleChangeStudent}
          />
          <br />
          <label style={{ marginRight: 13 }}>Age</label>
          <input
            type="number"
            name="age"
            value={this.state.tempStudent.age || 0}
            style={{ padding: 5, margin: 10 }}
            onChange={this.handleChangeStudent}
          />
          {this.state.isEdit ? (
            <button style={{ padding: 5 }} onClick={this.hanldeUpdateStudent}>
              Edit
            </button>
          ) : (
            <button style={{ padding: 5 }} onClick={this.hanldeAddStudent}>
              Add
            </button>
          )}
        </div>
        <table border={1}>
          <thead>
            <tr>
              <td style={{ padding: 10 }}>STT</td>
              <td style={{ padding: 10 }}>Name</td>
              <td style={{ padding: 10 }}>Age</td>
              <td style={{ padding: 10 }} colSpan={2}>
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: 10 }}>{item.id}</td>
                <td style={{ padding: 10 }}>{item.name}</td>
                <td style={{ padding: 10 }}>{item.age}</td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => this.hanldeDeleteStudent(item.id)}>
                    Delete
                  </button>
                </td>
                <td style={{ padding: 10 }}>
                  <button onClick={() => this.hanldeEditStudent(item.id)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
