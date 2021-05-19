import React, {useState} from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";

const initialFormData = {
  id: ``,
  firstName: ``,
  lastName: ``,
  email: ``,
  phone: ``
};

const AddUserForm = () => {
  const dispatch = useDispatch();

  const [opened, setIfOpened] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleFormChange = ({target: {name, value}}) =>
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  return (
    <div>
      {
        opened ?
        <form method="post" onChange={handleFormChange}>
          <input type="number" name="id" placeholder="id" value={formData.id}/>
          <input type="text" name="firstName" placeholder="First name" value={formData.firstName}/>
          <input type="text" name="lastName" placeholder="Last name" value={formData.lastName}/>
          <input type="email" name="email" placeholder="Email" value={formData.email}/>
          <input type="tel" name="phone" placeholder="Phone number" value={formData.phone}/>
          <button type="submit">Add to table</button>
        </form> :
        <button type="button" onClick={() => setIfOpened(true)}>Add user</button>
      }
    </div>
  );
};

export default AddUserForm;
