import React from "react";

//'classes' is an array of objects of {idclass,class name, lecturer name, subject code name, subject description}
//First map method iterate through each class and create a list for each class in the array
//Second map method creates an ul element containing value of each property in the class
const StuInfoClasses = ({ classes }) => {
  return (
    <div>
      <h1>List of enrolled classes:</h1>
      {classes.map((n, index) => (
        <li key={index}>
          <ul>
            {Object.values(n).map((n2, index2) => (
              <li key={index2}>{n2}</li>
            ))}
          </ul>
        </li>
      ))}
    </div>
  );
};

export default StuInfoClasses;
