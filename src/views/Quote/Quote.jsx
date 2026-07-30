import React, { useContext, useState } from "react";
import { ReducerContext, StateContext } from "../../context/createContext";
import { makeFetch } from "../../services/fetch";

import "./Quote.css";

const Quote = () => {
  const {
    urlApi,
    isAuth: { existToken },
    showToast,
  } = useContext(StateContext);
  const {
    auth: user,
    load: { load },
    dispatchLoad,
    dispatchAuth,
  } = useContext(ReducerContext);

  const [formFields, setFormFields] = useState({
    type: "presupuesto",
    client: {
      name: "",
      address: "",
      postalCode: "",
      nif: "",
      email: "",
    },
    items: [
      {
        quantity: 1,
        description: "",
        unitPrice: "",
      },
    ],
    observations: "",
  });

  const handleClientChange = (e) => {
    const { name, value } = e.target;

    setFormFields((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        [name]: value,
      },
    }));
  };

  const handleObservationChange = (e) => {
    setFormFields((prev) => ({
      ...prev,
      observations: e.target.value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;

    const newItems = [...formFields.items];
    newItems[index][name] =
      name === "quantity" || name === "unitPrice" ? Number(value) : value;

    setFormFields((prev) => ({
      ...prev,
      items: newItems,
    }));
  };

  const addItem = () => {
    setFormFields((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          quantity: 1,
          description: "",
          unitPrice: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormFields((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { response, data } = await makeFetch({
      url: urlApi.URL_POST_QUOTE,
      formFields,
      method: "POST",
      token: existToken,
    });

    if (response.status !== 200 && response.status !== 201) {
      showToast("error", data.message);
      return;
    }

    showToast("success", "Presupuesto enviado correctamente");
    // Reset form fields
    setFormFields({
      type: "presupuesto",
      client: {
        name: "",
        address: "",
        postalCode: "",
        nif: "",
        email: "",
      },
      items: [
        {
          quantity: 1,
          description: "",
          unitPrice: "",
        },
      ],
      observations: "",
    });
  };

  return (
    <div className="quote">
      <div className="quote__container">
        <h2 className="quote__title">Nuevo presupuesto</h2>

        <form className="quote__form" onSubmit={handleSubmit}>
          <h4 className="quote__section-title">Cliente</h4>

          <div className="quote__client">
            <input
              className="quote__input"
              type="text"
              name="name"
              placeholder="Nombre"
              value={formFields.client.name}
              onChange={handleClientChange}
            />

            <input
              className="quote__input"
              type="text"
              name="address"
              placeholder="Dirección"
              value={formFields.client.address}
              onChange={handleClientChange}
            />

            <input
              className="quote__input"
              type="text"
              name="postalCode"
              placeholder="Código Postal"
              value={formFields.client.postalCode}
              onChange={handleClientChange}
            />

            <input
              className="quote__input"
              type="text"
              name="nif"
              placeholder="NIF"
              value={formFields.client.nif}
              onChange={handleClientChange}
            />

            <input
              className="quote__input quote__input--full"
              type="email"
              name="email"
              placeholder="Email"
              value={formFields.client.email}
              onChange={handleClientChange}
            />
          </div>

          <hr className="quote__divider" />

          <div className="quote__items-header">
            <div>
              <h4 className="quote__section-title">Conceptos</h4>
              <i>
                Introduce la cantidad, la descripción del servicio y el precio{" "}
                <b style={{ color: "var(--p-text-secondary)" }}>sin iva.</b>
              </i>
            </div>

            <button
              type="button"
              className="quote__button quote__button--add"
              onClick={addItem}
            >
              Añadir concepto
            </button>
          </div>

          {formFields.items.map((item, index) => (
            <div className="quote__item" key={index}>
              <input
                className="quote__input quote__input--small"
                type="text"
                name="quantity"
                placeholder="Cantidad"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
              />

              <input
                className="quote__input"
                type="text"
                name="description"
                placeholder="Descripción"
                value={item.description}
                onChange={(e) => handleItemChange(index, e)}
              />

              <input
                className="quote__input quote__input--price"
                type="number"
                name="unitPrice"
                placeholder="Precio"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, e)}
              />

              {formFields.items.length > 1 && (
                <button
                  type="button"
                  className="quote__button quote__button--delete"
                  onClick={() => removeItem(index)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}

          <hr className="quote__divider" />

          <h4 className="quote__section-title">Observaciones</h4>

          <textarea
            className="quote__textarea"
            placeholder="Observaciones"
            value={formFields.observations}
            onChange={handleObservationChange}
          />

          <div className="quote__actions">
            <button
              type="submit"
              className="quote__button quote__button--submit"
            >
              Enviar presupuesto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quote;
