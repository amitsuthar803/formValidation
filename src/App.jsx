import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    information: "",
    contactNo: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[A-Za-z]+$/.test(value)) {
          error = `${
            name === "firstName" ? "First" : "Last"
          } name can only contain alphabets`;
        }
        break;

      case "dob":
        // eslint-disable-next-line no-case-declarations
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          error = "Date of birth must be in YYYY-MM-DD format";
        } else {
          const dob = new Date(value);
          let age = new Date().getFullYear() - dob.getFullYear();
          let m = new Date().getMonth() - dob.getMonth();
          if (m < 0 || (m === 0 && new Date().getDate() < dob.getDate())) {
            age--;
          } else {
            if (age < 18) {
              error = "you must be at least 18 years old";
            }
          }
        }
        break;

      case "contactNo":
        if (!/^\d{10}$/.test(value)) {
          error = "Contact number must be exactly 10 digits";
        }
        break;

      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format information to capital case
    const formatToCapitalCase = (text) =>
      text
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

    const formattedInformation = formatToCapitalCase(form.information);

    const formattedForm = {
      ...form,
      information: formattedInformation,
    };

    if (
      Object.keys(errors).every((key) => errors[key] === "") &&
      Object.keys(form).every((key) => form[key] !== "")
    ) {
      alert("Form is valid!");
      setForm(formattedForm); // Update the state with formatted information
    } else {
      alert("Please correct the errors in the form");
    }
    console.log(formattedForm);
  };

  return (
    <div className=" w-full flex flex-col">
      <form onSubmit={handleSubmit} action="">
        <div className="flex items-center  justify-start">
          <label htmlFor="">First Name</label>
          <input
            value={form.firstName}
            onChange={handleChange}
            type="text"
            name="firstName"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="flex items-center  justify-start">
          <label htmlFor="">Last Name</label>
          <input
            value={form.lastName}
            onChange={handleChange}
            type="text"
            name="lastName"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.lastName}
            </p>
          )}
        </div>
        <div className="flex items-center  justify-start">
          <label htmlFor="">Date of Birth</label>
          <input
            onChange={handleChange}
            value={form.dob}
            type="text"
            placeholder="YYYY-MM-DD"
            name="dob"
          />
          {errors.dob && (
            <p className="text-red-500 text-xs italic mt-1">{errors.dob}</p>
          )}
        </div>
        <div className="flex items-center  justify-start">
          <label htmlFor="">Information</label>
          <textarea
            onChange={handleChange}
            value={form.information}
            name="information"
            id=""
          ></textarea>
          {errors.information && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.information}
            </p>
          )}
        </div>
        <div className="flex items-center  justify-start">
          <label htmlFor="">contactNo</label>
          <input
            onChange={handleChange}
            value={form.contactNo}
            type="text"
            name="contactNo"
          />
          {errors.contactNo && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.contactNo}
            </p>
          )}
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
