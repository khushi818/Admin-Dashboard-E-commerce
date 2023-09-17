import { TextField } from "@mui/material";

type inputProps = {
  ismultiline?: boolean;
  rows?: number;
  inputType: string;
  inputName: string;
  inputValue: string | number;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  labelInputId: string;
  requiredTrue?: boolean;
  placeholderText: string;
};

const InputField = ({
  ismultiline,
  rows,
  inputType,
  inputName,
  inputValue,
  onChangeHandler,
  requiredTrue,
  labelInputId,
  placeholderText,
}: inputProps) => {
  return (
    <>
      {!ismultiline ? (
        <TextField
          fullWidth
          label={labelInputId}
          type={inputType}
          name={inputName}
          value={inputValue}
          onChange={onChangeHandler}
          id={labelInputId}
          placeholder={placeholderText}
          required={requiredTrue}
          autoComplete="off"
          size="small"
          sx={{
            "& .MuiInputBase-input": {
              borderRadius: "6px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px",
              paddingBottom: "2px",
            },
          }}
        />
      ) : (
        <TextField
          fullWidth
          multiline
          rows={rows}
          label={labelInputId}
          type={inputType}
          name={inputName}
          value={inputValue}
          required={requiredTrue}
          onChange={onChangeHandler}
          id={labelInputId}
          placeholder={placeholderText}
          autoComplete="off"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "16px",
              borderRadius: "6px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "16px",
              paddingBottom: "2px",
            },
          }}
        />
      )}
    </>
  );
};

export default InputField;
