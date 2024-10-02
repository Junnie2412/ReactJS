import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [list, setList] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    img: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((res) => {
      setList(res.data);
    });
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (isAdd) {
      const newProduct = { ...product, id: Date.now() };

      axios
        .post("http://localhost:3000/products", newProduct)
        .then(() => {
          toast.success("Created Successfully");
          setList((prevList) => [...prevList, newProduct]);
          resetForm();
        })
        .catch(() => {
          toast.error("Created Unsuccessfully");
        });
    } else {
      axios
        .put(`http://localhost:3000/products/${product.id}`, product)
        .then(() => {
          toast.success("Updated Successfully");
          setList((prevList) =>
            prevList.map((item) => (item.id === product.id ? product : item))
          );
          resetForm();
        })
        .catch(() => {
          toast.error("Update Unsuccessfully");
        });
    }
  };

  const handleOnEdit = (id) => {
    setIsAdd(false);
    const editProduct = list.find((item) => item.id === id);
    setProduct(editProduct);
  };

  const handleOnDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        toast.success("Deleted Successfully");
        setList((prevList) => prevList.filter((item) => item.id !== id));
      })
      .catch(() => {
        toast.error("Delete Unsuccessfully");
      });
  };

  const resetForm = () => {
    setProduct({
      id: "",
      name: "",
      description: "",
      img: "",
      price: 0,
      stock: 0,
    });
    setIsAdd(true);
  };

  const handleOnChangeSearch = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (searchId) {
      axios.get(`http://localhost:3000/products/${searchId}`).then((res) => {
        if (res.data) {
          setList([res.data]);
          toast.success("Search Successfully");
        } else {
          toast.error("Product not found");
          setList([]);
        }
      });
    } else {
      axios.get("http://localhost:3000/products").then((res) => {
        setList(res.data);
        toast.success("Search Successfully");
      });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div>
        <form onSubmit={handleOnSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Name: </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleOnChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Description: </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleOnChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Image: </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="img"
                    value={product.img}
                    onChange={handleOnChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Price: </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={handleOnChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Stock: </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="stock"
                    value={product.stock}
                    onChange={handleOnChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit" style={{ float: "right" }}>
                    {isAdd ? "Add" : "Update"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <br />
      <br />

      <div>
        <form onSubmit={handleSearchSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Seach By Id: </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={searchId}
                    onChange={handleOnChangeSearch}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <button type="submit" style={{ float: "right" }}>
                    Search
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <br />
      <br />

      <table border={1}>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Description</td>
            <td>Image</td>
            <td>Price</td>
            <td>Stock</td>
            <td colSpan={2}>Action</td>
          </tr>
        </thead>
        <tbody>
          {list.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.img} alt={product.name} width="100" />
              </td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleOnEdit(product.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleOnDelete(product.id)}>
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

export default App;
