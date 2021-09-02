import { useState } from 'react';
import axios from 'axios';

const DeleteButton = ({employee, employees, index, setEmployees} ) => {
    let newEmployees = [...employees]
    newEmployees.splice(index, 1)

    const handleClick = (e) => {
        e.preventDefault()        
        axios.delete(`http://localhost:5000/employees/${employee.id}`)
            .then(setEmployees([...newEmployees]))
            .catch(error => console.log(error))
    }

    return (
        <button onClick={handleClick}>Delete</button>
    )
}

export default DeleteButton