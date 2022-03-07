import "./formInput.scss";

const FromInput = ({
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
  if (inputName == "country") readonly = true;
  return (
    <div className={`${classes} form-controller`}>
      <div className="input-header">
        <label htmlFor={inputName}>{labelName}</label>
      </div>
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
      />
      <div className="errorMsg">Wrong format</div>
    </div>
  );
};

export default FromInput;
