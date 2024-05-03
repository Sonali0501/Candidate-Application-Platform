import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { setFilter } from '../../reducers/filters';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Filters } from '../../types/filters';

interface SelectInputProps {
    name: Filters;
    label: string;
    options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({ name, label, options }) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.filters[name])
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setFilter({ name, value: event.target.value }));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`lable-${label}`}>{label}</InputLabel>
      <Select
        labelId={`lable-${label}`}
        value={value || ""}
        label={value}
        onChange={handleChange}
      >
        {options?.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;