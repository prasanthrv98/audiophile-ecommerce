import { useState } from "react";
import "./formInput.scss";

const FormInput = ({
  labelName,
  inputName,
  inputType,
  placeholder,
  classes = "",
  inputStyle,
  pattern,
  value,
  onChange,
  readonly,
}) => {
  const [focused, setFocused] = useState(false);

  if (inputName == "country") readonly = true;

  let stateInput;
  if (inputName === "state") {
    stateInput = (
      <select name={inputName} className="select" onChange={onChange}>
        <option value="">Select a State</option>
        {value?.map((ele) => {
          return (
            <option key={ele.id} value={ele.id}>
              {ele.label}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <div className={`${classes} form-controller`}>
      <div className="input-header">
        <label htmlFor={inputName}>{labelName}</label>
      </div>
      {inputName == "state" ? (
        stateInput
      ) : (
        <input
          name={inputName}
          className={`${inputStyle} ${classes}`}
          type={inputType}
          id={inputName}
          placeholder={placeholder}
          required
          pattern={pattern}
          value={value}
          onChange={onChange}
          readOnly={readonly}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
        />
      )}

      <div className="errorMsg">Wrong format</div>
    </div>
  );
};

export default FormInput;
