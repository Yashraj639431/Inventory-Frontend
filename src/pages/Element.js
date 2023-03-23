// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import BreadCrum from "../components/BreadCrum";
// import { Link } from "react-router-dom";
// import CustomModal from "../components/CustomModal";
// import { BiEdit } from "react-icons/bi";
// import { AiOutlineDelete } from "react-icons/ai";
// import {
//   getElements,
//   deleteElements,
//   resetState,
// } from "../features/element/elementSlice";

// const columns = [
//   {
//     title: "SNo.",
//     dataIndex: "key",
//   },
//   {
//     title: "title",
//     dataIndex: "title",
//     sorter: (a, b) => a.title.length - b.title.length,
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

// const Element = () => {
//   const [open, setOpen] = useState(false);
//   const [elementId, setelementId] = useState("");

//   const showModal = (e) => {
//     setOpen(true);
//     setelementId(e);
//   };

//   const hideModal = () => {
//     setOpen(false);
//   };
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(resetState());
//     dispatch(getElements());
//   }, [dispatch]);
//   const elementState = useSelector((state) => state.element.elements);
//   const data1 = [];
//   for (let i = 0; i < elementState.length; i++) {
//     data1.push({
//       key: i + 1,
//       title: elementState[i].title,
//       action: (
//         <>
//           {/* <Link to={`/admin/element/color/${elementState[i]._id}`} className="fs-4"> */}
//           {/* <Link to={`/admin/element-color/`} className="fs-4"> */}
//           <Link to="" className="fs-4">
//             <BiEdit />
//           </Link>
//           <button
//             className="ms-3 text-danger fs-4 bg-transparent border-0"
//             onClick={() => showModal(elementState[i]._id)}
//           >
//             <AiOutlineDelete />
//           </button>
//         </>
//       ),
//     });
//   }

//   const deleteElement = (e) => {
//     dispatch(deleteElements(e));
//     setOpen(false);
//     setTimeout(() => {
//       dispatch(getElements());
//     }, 100);
//   };
//   return (
//     <>
//     <div className="dashboard-layout">
//         <section className="breadcrumb-header">
//           <h1>Items</h1>
//           <BreadCrum className="breadcrum" title="Items" />
//         </section>
//       </div>
//       <div>
//         <h3 className="mb-4 title">Elements</h3>
//         <div>
//           <Table columns={columns} dataSource={data1} />
//         </div>
//         <CustomModal
//           hideModal={hideModal}
//           open={open}
//           performAction={() => deleteElement(elementId)}
//           title="Ary you Sure you want to delete this Color ?"
//         />
//       </div>
//     </>
//   );
// };

// export default Element;
