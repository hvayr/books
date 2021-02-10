import React from 'react';
import BookList from './BookList';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import BookForm from './BookForm';
import { IBook } from './BookItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '800px',
    },
  }),
);

const MainView: React.FC = () => {
  const [selectedBook, setSelectedBook] = React.useState<IBook | null>(null);
  const [rendering, setRendering] = React.useState(false);

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item container direction="row" xs={6}>
          <Grid item>
            <BookForm
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
              setRendering={setRendering}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <BookList
            setSelectedBook={setSelectedBook}
            rendering={rendering}
            setRendering={setRendering}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MainView;
