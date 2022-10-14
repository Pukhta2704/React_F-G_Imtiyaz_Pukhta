import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import "./Add.css"
import * as Icon from "react-feather"
import SuccessMsg from "./SuccessMsg.js"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Validator from "../../Validator.js"
const schema = {
  name: { type: "string", required: true },
  email: { type: "email", required: true },
  phone: { type: "number", required: true }
}

const AddNew = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: "excellent",
    beverage: "excellent",
    clean: "excellent",
    dining: "excellent"
  })
  const [index, setIndex] = useState(parseInt(window.location.search.replace("?index=", "")))
  useEffect(() => {
    if (window.location.search) {
      const data = JSON.parse(localStorage.getItem("data"))
      parseInt(window.location.search.replace("?index=", ""))
      if (!data?.[index]) navigate("/")
      else setValues(data[index])
    }
  }, [])
  const [show, setShow] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value, errors: { ...values?.errors, [name]: undefined } })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const validator = new Validator({ schema, values })
    validator.validate()
    if (!validator.isValid) setValues({ ...values, errors: validator.errors })
    else {
      let data = JSON.parse(localStorage.getItem("data"))
      if (!data) data = []
      const { name, email, phone, service, beverage, clean, dining } = values
      if (isNaN(index)) {
        data = [{ name, email, phone, service, beverage, clean, dining }, ...data]
        localStorage.setItem("data", JSON.stringify(data))
      } else {
        data[index] = { name, email, phone, service, beverage, clean, dining }
        localStorage.setItem("data", JSON.stringify(data))
      }
      setShow(true)
    }
  }
  return (
    <>
      {values && (
        <div className="container-add-new">
          <div className="add-new">
            <div className="topbar">
              <h2>Aromatic bar</h2>
            </div>
            <div className="form">
              <div className="input">
                <label>
                  Customer Name
                  <span>*</span>
                </label>
                <input type="text" name="name" value={values.name} onChange={handleInputChange} placeholder="Name" />
                {values?.errors?.name && (
                  <p className="error-message">
                    <span>
                      <Icon.AlertCircle size={20} />
                    </span>
                    <span>{values?.errors?.name}</span>
                  </p>
                )}
              </div>
              <div className="input">
                <label>
                  Email
                  <span>*</span>
                </label>
                <input type="text" name="email" value={values.email} onChange={handleInputChange} placeholder="Email" />
                {values?.errors?.email && (
                  <p className="error-message">
                    <span>
                      <Icon.AlertCircle size={20} />
                    </span>
                    <span>{values?.errors?.email}</span>
                  </p>
                )}
              </div>
              <div className="input">
                <label>
                  Phone
                  <span>*</span>
                </label>
                <PhoneInput
                  country={"in"}
                  value={values.phone}
                  onChange={(phone) => handleInputChange({ target: { name: "phone", value: phone } })}
                  inputClass="phone-select-dropdown"
                  placeholder="Phone"
                />
                {values?.errors?.phone && (
                  <p className="error-message">
                    <span>
                      <Icon.AlertCircle size={20} />
                    </span>
                    <span>{values?.errors?.phone}</span>
                  </p>
                )}
              </div>
              <br />

              <div className="input-checkbox">
                <label>
                  Please rate the quality of the service you recieved from your host.
                  <span>*</span>
                </label>
                <div className="options">
                  <span>
                    <input
                      type="checkbox"
                      value="excellent"
                      checked={values.service === "excellent"}
                      name="service"
                      onChange={handleInputChange}
                    />
                    <label>Excellent</label>
                  </span>

                  <span>
                    <input
                      type="checkbox"
                      value="good"
                      checked={values.service === "good"}
                      name="service"
                      onChange={handleInputChange}
                    />
                    <label>Good</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="ok"
                      checked={values.service === "ok"}
                      name="service"
                      onChange={handleInputChange}
                    />
                    <label>Ok</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="bad"
                      checked={values.service === "bad"}
                      name="service"
                      onChange={handleInputChange}
                    />
                    <label>Bad</label>
                  </span>
                </div>
              </div>
              <div className="input-checkbox">
                <label>
                  Please rate the quality of your beverage.
                  <span>*</span>
                </label>
                <div className="options">
                  <span>
                    <input
                      type="checkbox"
                      value="excellent"
                      checked={values.beverage === "excellent"}
                      name="beverage"
                      onChange={handleInputChange}
                    />
                    <label>Excellent</label>
                  </span>

                  <span>
                    <input
                      type="checkbox"
                      value="good"
                      checked={values.beverage === "good"}
                      name="beverage"
                      onChange={handleInputChange}
                    />
                    <label>Good</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="ok"
                      checked={values.beverage === "ok"}
                      name="beverage"
                      onChange={handleInputChange}
                    />
                    <label>Ok</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="bad"
                      checked={values.beverage === "bad"}
                      name="beverage"
                      onChange={handleInputChange}
                    />
                    <label>Bad</label>
                  </span>
                </div>
              </div>

              <div className="input-checkbox">
                <label>
                  Was our restaurant clean?
                  <span>*</span>
                </label>
                <div className="options">
                  <span>
                    <input
                      type="checkbox"
                      value="excellent"
                      checked={values.clean === "excellent"}
                      name="clean"
                      onChange={handleInputChange}
                    />
                    <label>Excellent</label>
                  </span>

                  <span>
                    <input
                      type="checkbox"
                      value="good"
                      checked={values.clean === "good"}
                      name="clean"
                      onChange={handleInputChange}
                    />
                    <label>Good</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="ok"
                      checked={values.clean === "ok"}
                      name="clean"
                      onChange={handleInputChange}
                    />
                    <label>Ok</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="bad"
                      checked={values.clean === "bad"}
                      name="clean"
                      onChange={handleInputChange}
                    />
                    <label>Bad</label>
                  </span>
                </div>
              </div>

              <div className="input-checkbox">
                <label>
                  Please rate your overall dining experience.
                  <span>*</span>
                </label>
                <div className="options">
                  <span>
                    <input
                      type="checkbox"
                      value="excellent"
                      checked={values.dining === "excellent"}
                      name="dining"
                      onChange={handleInputChange}
                    />
                    <label>Excellent</label>
                  </span>

                  <span>
                    <input
                      type="checkbox"
                      value="good"
                      checked={values.dining === "good"}
                      name="dining"
                      onChange={handleInputChange}
                    />
                    <label>Good</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="ok"
                      checked={values.dining === "ok"}
                      name="dining"
                      onChange={handleInputChange}
                    />
                    <label>Ok</label>
                  </span>
                  <span>
                    <input
                      type="checkbox"
                      value="bad"
                      checked={values.dining === "bad"}
                      name="dining"
                      onChange={handleInputChange}
                    />
                    <label>Bad</label>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link to="/">
              <button className="goBack" onClick={() => setShow(true)}>
                Go back
              </button>
            </Link>
            <button className="submit" type="submit" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
          {show && <SuccessMsg />}
        </div>
      )}
    </>
  )
}
export default AddNew
