import { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({employees, setEmployees}) => {
    const [newEmployee, setNewEmployee] = useState(
        { first_name: '', last_name: '', email: '', phone: '', position: '', salary: '' }
    )

    const handleChange = (event) => {
        setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/employees', { ...newEmployee })
            .then(setEmployees(employees => [...employees, newEmployee]))
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmit} onChange={handleChange} className="add-employee-form">
            <table>
                <thead>
                    <tr>
                        <th colSpan="2"><h3>Add Employee</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" name="first_name" placeholder="First Name" /></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="last_name" placeholder="Last Name" /></td>
                    </tr>
                    <tr>
                        <td><input type="email" name="email" placeholder="Email Address" /></td>
                    </tr>
                    <tr>
                        <td><input type="tel" name="phone" placeholder="Phone Number" /></td>
                    </tr>
                    <tr>
                        <td><input type="text" name="position" placeholder="Position" /></td>
                    </tr>
                    <tr>
                        <td><input type="number" name="salary" placeholder="Salary" /></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="2"><input type="submit" value="Submit Employee" id="employee-submit" /></th>
                    </tr>
                </tfoot>

            </table>
        </form>
    )
}

export default EmployeeForm