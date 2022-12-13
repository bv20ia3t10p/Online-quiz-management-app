import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";

//'classes' is an array of objects of {idclass,class name, lecturer name, subject code name, subject description}
//First map method iterate through each class and create a list for each class in the array
//Second map method creates an ul element containing value of each property in the class
const deleteFromEnrollment = async (url) => {
  const reps = await fetch(url);
  await reps.json();
};

const StuInfoClasses = ({
  classes,
  isEditing,
  uid,
  phpHandler,
  state,
  setState,
  setIsEditing,
  setIsAddingClasses,
}) => {
  const handleRemove = (classID) => {
    const url = phpHandler + `?removeClassEnrollment=${classID}&stu=${uid}`;
    setState({
      ...state,
      classes: classes.filter((n) => n.ID_class !== classID),
    });
    deleteFromEnrollment(url);
  };
  return (
    <>
      <div className="StuInfo-Basic-Classes">
        <div className="single-class header">
          <div>Class ID</div>
          <div>Class name</div>
          <div>Lecturer name</div>
          <div>Subject ID</div>
          <div>Subject description</div>
          {isEditing[4] && <div>Remove</div>}
        </div>
        {classes.map((n, index) => (
          <div key={index} className="single-class">
            {Object.values(n).map((n2, index2) => (
              <div key={index2}>{n2}</div>
            ))}
            {isEditing[4] && (
              <button
                onClick={() => handleRemove(classes[index].ID_class)}
                className="single-class-delete"
              >
                <AiOutlineUserDelete />
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditing[4] && (
        <div className="StuInfo-Edit-Class-btn-container">
          <button
            onClick={() => {
              setIsAddingClasses(true);
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsEditing(
                isEditing.map((n, index) => {
                  if (index === 4) return false;
                  return n;
                })
              );
            }}
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
};

export default StuInfoClasses;
