import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

const InputComponent = ({id, label, inputState, inputsErrorsState, handleInputChange,isRequired, inputType}) => {
    const handleChange = (ev) =>{
        handleInputChange(ev);
    }
    return (
    <Grid item xs={12} sm={6}>
        <TextField
        fullWidth
        id={id}
        label={label}
        type={inputType}
        name={id}
        required={isRequired}
        autoComplete={id}
        value={inputState[id]}
        onChange={handleChange}
        />
        {inputsErrorsState && inputsErrorsState[id] && (
        <Alert severity="warning">
            {inputsErrorsState[id].map((item) => (
            <div key={`${label}-errors` + item}>{item}</div>
            ))}
        </Alert>
        )}
    </Grid>);
}

InputComponent.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    inputState: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isRequired: PropTypes.bool.isRequired,
    inputType: PropTypes.string.isRequired
};

InputComponent.defaultProps = {
    isRequired: false,
    inputType: "text",
    inputErrorsState: {}
};


export default InputComponent;