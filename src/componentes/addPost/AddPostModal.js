import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { PhotoPreviewPost } from "./PhotoPreviewPost";
import { FinalPostModal } from "./FinalPostModal";

export function AddPostModal() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const [image, setImage] = useState(null);
  const handleClose = () => {
    setModalShow(false);
  };

  return (
    <>
      <a
        className="ms-2"
        variant="primary"
        onClick={() => setModalShow(true)} //true
      >
        <PlusCircleOutlined
          className="ms-4"
          style={{ fontSize: "26px", color: "black" }}
        />
      </a>
      <PhotoPreviewPost
        image={image}
        setImage={setImage}
        show={modalShow}
        onHide={handleClose}
        setModalShow2={setModalShow2}
      />
      <FinalPostModal
        image={image}
        setImage={setImage}
        show={modalShow2}
        onHide={setModalShow2}
      />
    </>
  );
}
