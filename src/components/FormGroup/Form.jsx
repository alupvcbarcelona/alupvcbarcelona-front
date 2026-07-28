import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import "./Form.css";
import { Link, useLocation } from "react-router-dom";
import { LINKS } from "./utils";
import { StateContext } from "../../context/createContext";

const Form = ({ fields, btnText, onSubmit, load }) => {
  const [formFields, setFormFields] = useState(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: "",
      }),
      {},
    ),
  );
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [stateLocation, setStateLocation] = useState("");

  const { showToast } = useContext(StateContext);

  /*   const ROUTES = {
    '/login': 'login',
    '/recuperar-password': 'forgot',
    '/registro': 'register'
  }

  useEffect(() => {
    setStateLocation(ROUTES[location.pathname] || '')
  }, [location]) */

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "number" && value < 0) {
      showToast("info", "La cantidad debe ser mayor que cero.");
      return;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setFormFields({ ...formFields, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field) => {
      const value = formFields[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} es obligatorio`;
      }

      if (field.validate && value && !field.validate(value)) {
        newErrors[field.name] = `${field.label} no tiene un formato válido`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formFields);
      setFormFields(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
      );
    } else {
      showToast("error", "Hubo un error, por favor refresque la página");
      return;
    }
  };

  return (
    <form className="form__container" onSubmit={handleSubmitForm}>
      {fields.map((field, index) => (
        <div key={index} className="form__field">
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formFields[field.name]}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder}
            minLength={field.minLength}
          />
          {errors[field.name] && (
            <span className="form__error">{errors[field.name]}</span>
          )}
        </div>
      ))}

      <div className="form__btns">
        {load ? (
          <Loader w={50} h={20} />
        ) : (
          <Button p="5px" br="5px" onClick={handleSubmitForm} type="submit">
            {btnText}
          </Button>
        )}
        {/* <div>
          <ul>
            {(LINKS[stateLocation] || []).map((link, index) => (
              <li key={index}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </form>
  );
};

export default Form;
