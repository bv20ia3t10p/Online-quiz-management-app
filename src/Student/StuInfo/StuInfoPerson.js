import React, { useState } from "react";
import { useGlobalContext } from "../../setup/Context";

const commitUpdate = async (phpHandler, sid, field, newVal, setState, state) => {
  if (field === 'email') {
    if (!newVal.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      alert('Invalid email address');
      return;
    }
  }
  if (field === 'phone') {
    if (!/^\d+$/.test(newVal)) {
      alert('Invalid phone number');
      return;
    }
  }
  const encoded = encodeURI(newVal);
  const url = phpHandler + `?updFieldStu=${field}&newVal=${encoded}&sid=${sid}`;
  console.log(field);
  const data = await fetch(url);
  await data.json();
  setState({ ...state, [`${field}`]: newVal })
};

const StuInfoPersonDetail = (props) => {
  if (!props.isEditing[props.index])
    return <NonEditingFields {...props}></NonEditingFields>;
  return <EditingField {...props} />;
};

const EditingField = (props) => {
  const {
    text,
    value,
    isEditable,
    setIsEditing,
    index,
    isEditing,
    state,
    setState,
  } = props;
  const { phpHandler } = useGlobalContext();
  const [newVal, setNewVal] = useState(value);
  const name = Object.keys(state)[index];
  const handleEdit = () => {
    isEditable[index] &&
      setIsEditing(
        isEditing.map((n, index2) => {
          if (index === index2) return false;
          return n;
        })
      );
    commitUpdate(phpHandler, state[`ID`], name, newVal, setState, state);
  };
  return (
    <div key={index} className="StuInfo-Basic-Cards">
      <p className="label">{text}: </p>
      <input
        className="value"
        type="text"
        value={newVal}
        onChange={(e) => {
          // setState({ ...state, [`${name}`]: e.target.value });
          setNewVal(e.target.value);
        }}
      />
      <button onClick={handleEdit}>Ok</button>
    </div>
  );
};

const NonEditingFields = (props) => {
  const { text, value, isEditable, setIsEditing, index, isEditing } = props;
  return (
    <div key={index} className="StuInfo-Basic-Cards">
      <p className="label">{text}: </p>
      <span className="value">{value}</span>
      {isEditable[index] && (
        <button
          onClick={() =>
            isEditable[index]
              ? setIsEditing(
                isEditing.map((n, index2) => {
                  if (index === index2) return true;
                  return n;
                })
              )
              : ""
          }
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default StuInfoPersonDetail;
