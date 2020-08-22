import React from "react";
import { FaTrash } from "react-icons/fa";
import { IconContext } from "react-icons";

const DeviceItem = (props) => {
  const { device, onDelete, showDelete } = props;
  return (
    <>
      <ul>
        <li>uid: {device.uid}</li>
        <li>vendor: {device.vendor}</li>
        <li>createAt: {device.createAt}</li>
        <li>status: {device.status}</li>
      </ul>

      {showDelete && (
        <div
          className="float-right link-style"
          onClick={(_) => onDelete(device._id)}
        >
          <IconContext.Provider
            value={{ color: "red", className: "global-class-name" }}
          >
            <FaTrash />
          </IconContext.Provider>
        </div>
      )}
    </>
  );
};

export default DeviceItem;
