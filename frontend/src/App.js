import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';
import EditButton from './components/EditButton';
import DeleteButton from './components/DeleteButton'

function App() {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => { setEmployees(response.data) })
      .catch(error => { console.log(error) })
  }, [])

  return (
    <>
      <div className="container">
        {employees.length > 0 ?
          <div className="employee-list-wrapper">
            {employees.map((employee, index) =>
              <li className="employee-item" key={employee.email}>
                <ul className="employee-name">
                  {employee.first_name} {employee.last_name}
                </ul>
                <ul className="employee-contact-info">
                  <div className="email">Email: {employee.email}</div>
                  <div className="phone">Phone: {employee.phone}</div>
                </ul>
                <ul className="employee-details">
                  <div className="position">Position: {employee.position} </div>
                  <div className="salary">Salary: ${employee.salary}</div>
                </ul>
                <div className="edit-delete">
                  <EditButton employee={employee} employees={employees} index={index} setEmployees={setEmployees} />
                  <DeleteButton employee={employee} employees={employees} index={index} setEmployees={setEmployees} />
                </div>
              </li>
            )}
          </div>
          :
          <h3>LOADING</h3>
        }
        <EmployeeForm setEmployees={setEmployees} employees={employees} />
      </div>
    </>
  );
}

export default App;
