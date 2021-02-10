import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface Props {
  id: number;
  title: string;
  author: string;
  description: string;
}

export const useForm = (props: Props) => {
  const [values, setValues] = React.useState(props);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, setValues, onValueChange };
};

interface FormProps {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        width: '97%',
        margin: theme.spacing(0.4),
      },
    },
  }),
);

const Form = (props: FormProps) => {
  const classes = useStyles();
  return <form className={classes.root}>{props.children}</form>;
};

export default Form;
