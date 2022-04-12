import React from "react";
import Attachment from "../svg/Attachment";
import useSound from 'use-sound';
import boopSfx from './sounds/iphone-notificacion.mp3';

const MessageForm = ({ handleSubmit, text, setText, setImg, setFocus}) => {
  const [play] = useSound(boopSfx);
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
          onFocus={() => setFocus(true)}
          onBlur={()=>setFocus(false)}
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
