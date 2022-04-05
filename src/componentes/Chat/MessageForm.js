import React from "react";
import Attachment from "../svg/Attachment";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <div className="barra-form">
        <label htmlFor="img">
          <Attachment />
        </label>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          id="img"
          accept="image/*"
          style={{ display: "none" }}
          className="input-img"
        />
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input-texto"
        />
        <div>
          <button className="btn">Send</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
