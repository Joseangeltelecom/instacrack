import React from "react"

export const PostProfileOthers = (props) => {
  return (
    <div
      class="row justify-content-center"
      style={
        {
          // backgroundColor: "blue"
        }
      }
    >
      <div
        class="col-8"
        style={{
          //   backgroundColor: "green",
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <a href="" style={{ margin: "12px" }}>
          {props.imagePostUrl && (
            <img
              src={props.imagePostUrl}
              style={{ width: "270px", height: "270px" }}
            />
          )}
        </a>
      </div>
    </div>
  )
}
