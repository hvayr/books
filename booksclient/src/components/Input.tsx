import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  name: string;
  label: string;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [x: string]: any;
}

const Input = (props: Props) => {
  const { name, value, label, onValueChange, ...other } = props;

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      variant="outlined"
      onChange={onValueChange}
      {...other}
    />
  );
};

export default Input;
