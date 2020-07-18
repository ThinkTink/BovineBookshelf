import React from 'react';
import { Card, CardMedia, Typography, makeStyles } from '@material-ui/core';
import cowPhoto from './cow.jpg';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    paddingTop: '5px'
  },
  image: {
    height: '75vh',
    [theme.breakpoints.down('md')]: {
      height: '52vh'
    },
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <Typography variant='h2' className={classes.title}>Bovine Bookshelf</Typography>
      <CardMedia component="img" image={cowPhoto} className={classes.image}/>
    </Card>
  )
};
