import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const EditButton = ({ employee, employees, index, setEmployees }) => {
    Modal.setAppElement(document.getElementById('root'));

    const [updatedEmployee, setUpdatedEmployee] = useState(employee)
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    const handleChange = (event) => {
        setUpdatedEmployee({ ...updatedEmployee, [event.target.name]: event.target.value })
    }

  

    const handleSubmit = (e) => {
        e.preventDefault()
        let newEmployees = [...employees]
        newEmployees.splice(index, 1, updatedEmployee)
        axios.patch(`http://localhost:5000/employees/${employee.id}`, { ...updatedEmployee })
            .then(setEmployees([...newEmployees]))
            .catch(error => console.log(error))
        closeModal()
    }

    return (
        <>
            <button onClick={openModal} className="edit-button">Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <form onSubmit={handleSubmit} onChange={handleChange}>
                    <div className="modal-table-wrapper">
                        <h3 className="edit-header">Edit Employee</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" name="first_name" placeholder={employee.first_name} /></td>
                                </tr>
                                <tr>
                                    <td><input type="text" name="last_name" placeholder={employee.last_name} /></td>
                                </tr>
                                <tr>
                                    <td><input type="email" name="email" placeholder={employee.email} /></td>
                                </tr>
                                <tr>
                                    <td><input type="tel" name="phone" placeholder={employee.phone} /></td>
                                </tr>
                                <tr>
                                    <td><input type="text" name="position" placeholder={employee.position} /></td>
                                </tr>
                                <tr>
                                    <td><input type="number" name="salary" placeholder={employee.salary} /></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="2">
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="edit-modal-buttons">
                            <button type="submit" id="employee-edit" >Complete Edit</button>
                            <button onClick={closeModal}>Cancel Edit</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditButton