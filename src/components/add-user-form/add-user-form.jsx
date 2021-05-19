import React, {useState} from "react";
import {useDispatch} from "react-redux";

import {addUser} from "../../store/action-creators";
import useValidation from '../../hooks/use-validation';
import {ValidationType} from "../../const";

const initialFormData = {
  id: ``,
  firstName: ``,
  lastName: ``,
  email: ``,
  phone: ``
};

const inputTypes = {
  id: ValidationType.NUMBER,
  firstName: ValidationType.STRING,
  lastName: ValidationType.STRING,
  email: ValidationType.EMAIL,
  phone: ValidationType.PHONE
};

const AddUserForm = () => {
  const dispatch = useDispatch();

  const [opened, setIfOpened] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const {errorMessages, isValid, validate} = useValidation(inputTypes);

  const handleFormChange = ({target: {name, value}}) =>
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    const handleFormSubmit = (evt) => {
      evt.preventDefault();

      validate(formData);

      if (!isValid) {return}

      dispatch(addUser({
        ...formData,
        id: Number(formData.id)
      }));

      setFormData(initialFormData);
    };

  return (
    <div>
      {
        opened ?
        <form method="post" onChange={handleFormChange} onSubmit={handleFormSubmit} noValidate>
          <input type="number" name="id" placeholder="id" value={formData.id}/>
          {errorMessages.id}
          <input type="text" name="firstName" placeholder="First name" value={formData.firstName}/>
          {errorMessages.firstName}
          <input type="text" name="lastName" placeholder="Last name" value={formData.lastName}/>
          {errorMessages.lastName}
          <input type="email" name="email" placeholder="Email" value={formData.email}/>
          {errorMessages.email}
          <input type="tel" name="phone" placeholder="Phone number" value={formData.phone}/>
          {errorMessages.phone}
          <button type="submit">Add to table</button>
        </form> :
        <button type="button" onClick={() => setIfOpened(true)}>Add user</button>
      }
    </div>
  );
};

export default AddUserForm;
