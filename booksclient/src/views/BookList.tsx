import {
  createStyles,
  GridList,
  GridListTile,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React from 'react';
import useSearch from '../components/useSearch';
import BookItem, { IBook } from './BookItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '238px',
      marginTop: '2px',
      borderWidth: '1px',
    },
    button: {
      height: '15px',
      textTransform: 'none',
    },
    list: {
      height: '238px',
      display: 'block',
    },
    book: {
      marginTop: '5px',
    },
  }),
);

interface Props {
  setSelectedBook: React.Dispatch<React.SetStateAction<null | IBook>>;
  rendering: boolean;
  setRendering: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookList: React.FC<Props> = ({
  setSelectedBook,
  rendering,
  setRendering,
}: Props) => {
  const { bookData, loading } = useSearch({ rendering, setRendering });
  const classes = useStyles();

  return (
    <Paper elevation={0} variant="outlined" className={classes.root}>
      {loading && 'Loading books...'}
      <GridList cellHeight="auto" cols={1} className={classes.list}>
        {bookData.map((b: IBook) => (
          <GridListTile key={b.id} cols={1} className={classes.book}>
            <BookItem
              id={b.id}
              title={b.title}
              author={b.author}
              description={b.description}
              setSelectedBook={setSelectedBook}
              setRendering={setRendering}
            />
          </GridListTile>
        ))}
      </GridList>
    </Paper>
  );
};

export default BookList;
