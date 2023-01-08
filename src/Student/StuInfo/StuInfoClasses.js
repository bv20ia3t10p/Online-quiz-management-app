import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useParams } from "react-router-dom";

//'classes' is an array of objects of {idclass,class name, lecturer name, subject code name, subject description}
//First map method iterate through each class and create a list for each class in the array
//Second map method creates an ul element containing value of each property in the class
const deleteFromEnrollment = async (url) => {
  try {
    console.log(url);
    const conf = window.confirm('Are you sure to delete?');
    // if (!conf) return;
    if (!conf) throw new Error('Delete canceled');
    const resp = await fetch(url);
    const data = await resp.json();
    if (!data) throw new Error("Delete failed");
    alert("Deleted successfully");
    window.location.reload();
  } catch (e) {
    alert(e);
  }
};

const StuInfoClasses = ({
  classes,
  isEditing,
  phpHandler,
  state,
  setState,
  setIsEditing,
  setIsAddingClasses,
}) => {
  const { sid } = useParams("sid");
  const handleRemove = (classID) => {
    const url = phpHandler + `?removeClassEnrollment=${classID}&stu=${sid}`;
    setState({
      ...state,
      classes: classes.filter((n) => n.ID_class !== classID),
    });
    deleteFromEnrollment(url);
  };
  return (
    <>
      <div className="StuInfo-Basic-Classes">
        <span className="stu-info-classes-title">List of enrolled classes</span>
        <div className="single-class header">
          <div>Class ID</div>
          <div>Class name</div>
          <div>Lecturer name</div>
          <div>Subject ID</div>
          <div>Subject description</div>
          {isEditing[4] && <div>Remove</div>}
        </div>
        <div className="stu-info-classes-list">
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
