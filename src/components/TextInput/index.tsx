import React from "react";
import { TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFilter } from "../../reducers/filters";
import { Filters } from "../../types/filters";

interface TextFieldProps {
    name: Filters;
    placholder: string;
}

const TextInput: React.FC<TextFieldProps> = ({ name, placholder }) => {
    const dispatch = useAppDispatch();
    const value = useAppSelector((state) => state.filters[name])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter({ name: name, value: event.target.value }))
    }

    return (
        <TextField
          label={placholder}
          name={name}
          value={value}
          size="small"
          onChange={handleChange}
        />
    )
}

export default TextInput;