import React from "react";
import { useGlobalContext } from "../../setup/Context";

const commitUpdate = async (phpHandler, sid, field, newVal) => {
  const url = phpHandler + `?updFieldStu=${field}&newVal=${newVal}&sid=${sid}`;
  console.log(url);
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
  const name = Object.keys(state)[index];
  const handleEdit = () => {
    isEditable[index] &&
      setIsEditing(
        isEditing.map((n, index2) => {
          if (index === index2) return false;
          return n;
        })
      );
    commitUpdate(phpHandler, state[`ID`], name, state[`${name}`]);
  };
  return (
    <div>
      <p>{text}: </p>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setState({ ...state, [`${name}`]: e.target.value });
        }}
      />
      <button onClick={handleEdit}>Ok</button>
    </div>
  );
};

const NonEditingFields = (props) => {
  const { text, value, isEditable, setIsEditing, index, isEditing } = props;
  return (
    <div>
      <p>{text}: </p>
      <span>{value}</span>
      {isEditable[index] && (
        <button
          onClick={(e) =>
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
