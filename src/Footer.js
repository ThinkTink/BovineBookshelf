import React from 'react';
import { Typography, makeStyles, Link } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '1rem',
    textAlign: 'center'
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography>
        {new Date().getFullYear()} — ThinkTink — <Link href="https://github.com/ThinkTink/BovineBookshelf"> <GitHubIcon color='action'/> </Link>
      </Typography>
    </footer>
  )
};
