import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";

const PopModal = () => {
  const [modal, setmodal] = useState(false);

  return (
    <>
      <div>
        <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
          <ModalHeader toggle={() => setmodal(!modal)}>
            Edit Element
          </ModalHeader>
          <ModalBody>
            <form>
              <Row>
                <Col lg={12}>
                  <div>
                    <label htmlFor="name" className="py-2 mx-1">
                      Elements Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                    />
                  </div>
                </Col>
                <Col lg={12}>
                  <div>
                    <div>
                      <label htmlFor="status" className="py-1 mx-1">
                        Status
                      </label>
                    </div>
                    <select
                      name=""
                      defaultValue={"Active"}
                      className="form-control form-select"
                      id=""
                      onChange={(e) => {
                        // setElementStatus(e.target.value, getElementId);
                      }}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </Col>
                <button
                  className="btn-modal mt-5 mx-5"
                  style={{
                    backgroundColor: "#0b3629",
                    color: "white",
                    width: "20%",
                    padding: "6px 22px",
                  }}
                >
                  Close
                </button>
                <button
                  className="btn-modal mt-5"
                  style={{
                    backgroundColor: "#0b3629",
                    color: "white",
                    width: "30%",
                    padding: "6px 22px",
                  }}
                >
                  Save Changes
                </button>
              </Row>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default PopModal;
