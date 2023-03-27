import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import BreadCrum from "../components/BreadCrum";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { AiOutlineDelete } from "react-icons/ai";
import {
  getValues,
  deleteValues,
  resetState,
} from "../features/elementValue/elementValueSlice";
const ElementPage = (props) => {
  const dispatch = useDispatch();
  const id = document.URL.split("/")[5];
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);
  const [valueId, setvalueId] = useState("");
  const [loading, setLoading] = useState(false);
  const [elementValue, setElementValue] = useState("");
  let valId = document.URL.split("/")[6];
  const navigate = useNavigate();
  const showModal = (e) => {
    setOpen(true);
    setvalueId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getValues(id));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, id]);

  const fetchData = async () => {
    try {
      const url = `http://localhost:5000/api/value/${id}`;
      const res = await axios.get(url);
      setResponse(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteValue = (e) => {
    dispatch(deleteValues(e));
    setOpen(false);
    
      window.location.reload(false);
      dispatch(getValues());
    
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let url;
      let res;
      if (valId === undefined || valId === null) {
        url = `http://localhost:5000/api/value/${id}`;
        res = await axios.post(url, { title: elementValue });
        fetchData();
      } else {
        let splittingId = id.split("?")[0];
        url = `http://localhost:5000/api/value/${splittingId}/${valId}`;
        res = await axios.put(url, {
          title: elementValue,
        });
        fetchData();
      }
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBtnChanger = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="dashboard-layout">
        {loading ? (
          <>
            <h4>Loading Please Wait....</h4>
          </>
        ) : (
          <>
            <section className="breadcrumb-header mb-4">
              <h1>Element Name : {response[0]?.elements?.title}</h1>
              <BreadCrum
                className="breadcrum"
                title={response[0]?.elements?.title}
              />
              <button
                type="button"
                className="btn btn-outline-primary my-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add {response[0]?.elements?.title}
              </button>
            </section>
            <section id="main-element-box">
              <div className="main-content">
                <div className="print-buttons m-3">
                  <button className="btn btn-secondary btn-sm px-3 me-2">
                    Copy
                  </button>
                  <button className="btn btn-secondary btn-sm px-3 me-2">
                    CSV
                  </button>
                  <button className="btn btn-secondary btn-sm px-3 me-2">
                    Excel
                  </button>
                  <button className="btn btn-secondary btn-sm px-3 me-2">
                    Print
                  </button>
                </div>

                <div className="input-group">
                  <div className="form-outline">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Search"
                      //   onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                  </div>
                  <button type="button" className="search-btn btn btn-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="mt-0">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Element Value</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        width: "100%",
                        margin: "0",
                        padding: "0",
                      }}
                    >
                      {response.length === 0 ? (
                        <>
                          <tr
                            style={{
                              width: "100%",
                              padding: "0",
                              margin: "0",
                              textAlign: "center",
                            }}
                          >
                            <td
                              style={{
                                width: "100%",
                              }}
                            >
                              No Data
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {response.map((item, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{item.title}</td>
                                <td>
                                  <Link
                                    to={`/admin/value/${id}/${item._id}`}
                                    className="text-dark fs-4 bg-transparent border-0 px-4"
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-outline-primary my-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                    >
                                      <BiEdit />
                                    </button>
                                  </Link>
                                  <button
                                    className="ms-3 text-danger fs-4 bg-transparent border-0"
                                    onClick={() => showModal(item._id)}
                                  >
                                    <AiOutlineDelete />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      )}
                    </tbody>
                    <caption>List of users</caption>
                  </table>
                  <CustomModal
                    hideModal={hideModal}
                    open={open}
                    performAction={() => deleteValue(valueId)}
                    title="Ary you Sure you want to delete this Value ?"
                  />
                </div>
              </div>
              <div className="create-element">
                <div
                  style={{ height: "55vh" }}
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog position-relative">
                    <div className="modal-content" style={{ height: "55vh" }}>
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {valId === undefined ? "Update Values" : "Add Values"}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          onClick={handleBtnChanger}
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form action="" onSubmit={handleSubmit}>
                          <label htmlFor="" className="fs-4 w-100 mb-2">
                            Elements Name
                          </label>
                          <input
                            className="form-control w-100 fs-6"
                            type="text"
                            placeholder="Enter value"
                            id="title"
                            name="title"
                            onChange={(e) => setElementValue(e.target.value)}
                            value={elementValue}
                          />
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            data-bs-dismiss="modal"
                            className="btn btn-primary"
                          >
                            {valId ? "Update" : "Add"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default ElementPage;
