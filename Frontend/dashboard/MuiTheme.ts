import { createTheme } from "@mui/material";

const MuiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0D507D",
    },
    secondary: {
      main: "#2298BC",
    },
  },
  typography: {
    htmlFontSize: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "contained",
      },
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          fontWeight: "600",
          borderRadius: "64px",
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
    },
    MuiInputLabel: {
      // defaultProps: {
      // margin: "dense",
      // shrink: true,
      // disableAnimation: true,
      // },
      styleOverrides: {
        root: {
          fontWeight: 500,
          transform: "none",
          position: "static",
          color: "'#333333",
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "dense",
        color: "primary",
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          transform: "none",
          position: "static",
          "& .MuiInputBase-root": {
            border: "1px solid grey",
            "&:focused": {
              border: "1px solid #0D507D",
            },
          },
          "& .Mui-focused fieldset": {
            border: "none",
            outline: "none",
          },
        },
      },
    },
    MuiList: {
      defaultProps: {
        dense: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default MuiTheme;
