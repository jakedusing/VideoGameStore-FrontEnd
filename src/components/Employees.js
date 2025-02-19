import React, { useState, useEffect } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.employee_id}>
            <h2>
              {employee.firstName} {employee.lastName}
            </h2>
            <p>{employee.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Employees;
