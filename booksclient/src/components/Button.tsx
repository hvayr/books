import React from 'react';
import {
  Button as MuiButton,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(0.5),
    },
  }),
);

interface Props {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  [x: string]: any;
}

const Button = (props: Props) => {
  const { label, onClick, disabled, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant="outlined"
      onClick={onClick}
      disabled={disabled || false}
      className={classes.button}
      {...other}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
