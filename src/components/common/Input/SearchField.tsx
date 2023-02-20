import { FC } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface IProps {
    placeholder: string;
    value: string;
    handleChange: (searchText: string) => void;
}

export const SearchField: FC<IProps> = ({ placeholder, value, handleChange }) => (
    <TextField
          size="small"
          sx={{ width: 300 }}
          placeholder={placeholder}
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
);

//"Search by ID or scan QR Code"