import React, { Component } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import FormWrapper from "../containers/FormWrapper";

class Form extends Component {
    handleInput = (event) => {
      const { value, name } = event.currentTarget;
      this.setState(({ data, errors }) => ({
        data: {
          ...data,
          [name]: value,
        },
        errors: {
          ...errors,
          [name]: "",
        },
      }));
    };
    handleSubmit = (e) => {
      e.preventDefault();
      const { data } = this.state;
      const isValid = Object.keys(data).reduce(
        (sum, item) => sum && this.validate(item, data[item]),
        true
      );
      if (isValid) {
        console.log(data);
      }
    };
    validate = (name, value) => {
      if (!value.trim()) {
        this.setState(
          ({ errors }) => ({
            errors: {
              ...errors,
              [name]: "валера давай заповни поле",
            },
          }),
          () => false
        );
      } else {
        return true;
      }
    };
    render() {
    const {
      data: { username, email, phone },
      errors,
      handleInput,
      handleSubmit,
    } = this.props;
    return (
      <div className="openBill">
        <form className="openBillForm" onSubmit={handleSubmit}>
          <Input
            key="username"
            value={username}
            name="username"
            onChange={handleInput}
            placeholder="Логин"
            error={errors.username}
            required
          />
          <Input
            key="phone"
            value={phone}
            name="phone"
            onChange={handleInput}
            placeholder="Телефон"
            error={errors.phone}
            required
          />
          <Input
            key="email"
            value={email}
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Электронная почта"
            error={errors.email}
            required
          />
          <button type="submit" className="submitBtn">
            Отправить форму
          </button>
        </form>
      </div>
    );
  }
}
const initialState = {
  username: "",
  phone: "",
  email: "",
};

Form.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    username: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default FormWrapper(initialState, initialState)(Form);
