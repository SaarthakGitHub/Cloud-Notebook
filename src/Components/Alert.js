import React from "react";
export const Alert = (props) => {
  return (
    <div style={{height: '60px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
        {props.alert.message}
      </div>
      }
    </div>
  );
};
