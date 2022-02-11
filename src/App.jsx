import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./index.css";

const App = () => {
  let [state, setState] = useState({
    std_name: "",
    std_id: "",
    email: "",
    courses: "",
  });
  let { std_name, std_id, email, courses } = state;
  let std_data = {
    name: std_name,
    std_id: std_id,
    email: email,
    courses: courses,
  };

  let [payload, setPayload] = useState([]);
  let [edit, setEdit] = useState(false);
  let [editPayloadData, setEditPayloadData] = useState();
  useEffect(() => {
    let fetchData = async () => {
      let std_data = await axios.get("/students");
      setPayload(std_data.data.payload);
    };
    fetchData();
  }, []);

  let handleSubmit = async e => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "/students",
      data: JSON.stringify(std_data),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    window.location.reload();
  };
  // console.log(payload);
  let handleDelete = async _id => {
    await axios
      .delete(`/students/${_id}`)
      .then(x => console.log("deleted"))
      .catch(err => {
        console.log(err);
      });
    window.location.reload();
  };

  let handleEdit = () => {
    // setEdit(true);
    // await axios.put({
    //   url: `/student/${_id}`,
    //   data: {
    //     name: std_name,
    //     std_id: std_id,
    //     email: email,
    //     courses: courses,
    //   },
    // });
    // window.location.reload();
  };

  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <section>
      <article>
        <div id="formData">
          <h1>Student Data</h1>
          {edit ? (
            <form>
              <div>
                <input
                  type="text"
                  placeholder="enter a name"
                  name="std_name"
                  id="name"
                  // value={std_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="enter student id"
                  name="std_id"
                  id="std_id"
                  // value={std_id}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  id="email"
                  // value={email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="enter courses"
                  name="courses"
                  id="courses"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button>Update</button>
              </div>
            </form>
          ) : (
            <form>
              <div>
                <input
                  type="text"
                  placeholder="enter a name"
                  name="std_name"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="enter student id"
                  name="std_id"
                  id="std_id"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="enter courses"
                  name="courses"
                  id="courses"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          )}
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Std ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Courses</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            {payload.map(data => (
              <tbody key={data._id}>
                <tr>
                  <td>{data.std_id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.courses}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEdit(data._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </article>
    </section>
  );
};

export default App;
