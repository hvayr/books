import React from 'react';
import {
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: '15px',
      textTransform: 'none',
    },
  }),
);

export interface IBook {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface Props {
  id: number;
  title: string;
  author: string;
  description: string;
  setSelectedBook: React.Dispatch<React.SetStateAction<null | IBook>>;
  setRendering: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookItem = (props: Props) => {
  const { id, title, author, description, setSelectedBook } = props;
  const classes = useStyles();

  const onBookSelect = () => {
    const newBook: IBook = {
      id: id,
      title: title,
      description: description,
      author: author,
    };
    setSelectedBook(newBook);
  };

  return (
    <Button className={classes.button} onClick={onBookSelect}>
      <Typography variant="subtitle1">
        {title}, {author}
      </Typography>
    </Button>
  );
};

export default BookItem;
