import React, { useEffect } from 'react';
import Input from '../components/Input';
import { fetchData, Method } from '../api/utils';
import Form, { useForm } from '../components/useForm';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import Button from '../components/Button';
import { IBook } from './BookItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
      margin: theme.spacing(0.4),
    },
  }),
);

export const initialValues = {
  id: 0,
  title: '',
  author: '',
  description: '',
};

interface Props {
  selectedBook: IBook | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<null | IBook>>;
  setRendering: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookForm: React.FC<Props> = ({
  selectedBook,
  setSelectedBook,
  setRendering,
}: Props) => {
  const { values, setValues, onValueChange } = useForm(initialValues);
  const { id, title, author, description } = values;
  const classes = useStyles();

  useEffect(() => {
    if (selectedBook) {
      setValues({
        author: selectedBook.author,
        description: selectedBook.description,
        title: selectedBook.title,
        id: selectedBook.id,
      });
    }
  }, [selectedBook]);

  const saveNewBook = () => {
    const fetch = async () => {
      const response = await fetchData(Method.POST, {
        title: title,
        author: author,
        description: description,
      });

      response.status === 201
        ? setRendering(true)
        : alert('Error: ' + response.status);
    };
    fetch();
  };

  const saveBook = () => {
    const fetch = async () => {
      const response = await fetchData(
        Method.PUT,
        {
          title: title,
          author: author,
          description: description,
        },
        id,
      );

      response.status === 204
        ? setRendering(true)
        : alert('Error: ' + response.status);

      const newBook: IBook = {
        id: id,
        title: title,
        description: description,
        author: author,
      };
      setSelectedBook(newBook);
    };
    fetch();
  };

  const deleteBook = () => {
    const fetch = async () => {
      const response = await fetchData(Method.DELETE, null, id);

      response.status === 200
        ? setRendering(true)
        : alert('Error: ' + response.status);

      setSelectedBook(null);
    };
    fetch();
  };

  function disableSave() {
    if (checkIfEmptyFields()) {
      return true;
    }

    if (!selectedBook) {
      return true;
    }

    return (
      title === selectedBook?.title &&
      author === selectedBook?.author &&
      description === selectedBook?.description
    );
  }

  function checkIfEmptyFields() {
    return title === '' || author === '' || description === '';
  }

  return (
    <Form>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Input
            name="title"
            label="title"
            value={title}
            onValueChange={onValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="author"
            label="author"
            value={author}
            onValueChange={onValueChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="description"
            label="description"
            value={description}
            onValueChange={onValueChange}
            multiline
            rows="4"
          />
        </Grid>
        <Grid container className={classes.buttonContainer}>
          <Grid item>
            <Button
              label="Save New"
              onClick={saveNewBook}
              disabled={checkIfEmptyFields()}
            />
          </Grid>
          <Grid item>
            <Button label="Save" onClick={saveBook} disabled={disableSave()} />
          </Grid>
          <Grid item>
            <Button
              label="Delete"
              onClick={deleteBook}
              disabled={!selectedBook}
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  );
};

export default BookForm;
