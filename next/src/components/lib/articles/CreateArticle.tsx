import 'easymde/dist/easymde.min.css';

import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';

import { ArticleContentType } from '../../../graphql/generated/types';
import { useCreateArticle } from '../../../hooks/articles.hooks';

const useStyles = makeStyles({
  root: {},
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  titleTextField: {
    flexGrow: 1,
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 10,
    // flexGrow: 1,
  },
  title: {
    textAlign: 'center',
  },
  titleInputContainer: {
    // flexGrow: 1,
    // display: 'flex',
  },
  markdownEditor: {
    textAlign: 'left',
  },
});

export const CreateArticle: React.FC<{}> = props => {
  const classes = useStyles({}); // WTF ?

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { createArticle, error, loading } = useCreateArticle();
  return (
    <Grid container alignItems="center" direction="column">
      <Grid item className={classes.titleContainer} md={10}>
        <Typography variant="h3" className={classes.title}>
          Create Article
        </Typography>
      </Grid>
      <Grid item container className={classes.titleInputContainer}>
        <Grid item sm xs></Grid>
        <Grid item sm={8} xs={10}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              // id="standard-basic"
              className={classes.titleTextField}
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              // margin="normal"
            />
          </form>
        </Grid>
        <Grid item sm xs></Grid>
      </Grid>
      <Grid item>
        <br />
      </Grid>
      <Grid item container alignItems="center">
        <Grid item sm xs></Grid>
        <Grid item sm={8} xs={10}>
          <SimpleMDE className={classes.markdownEditor} onChange={e => setContent(e)} value={content} />
        </Grid>
        <Grid item sm xs></Grid>
      </Grid>
      <Grid item md={10}>
        <Button
          color="primary"
          onClick={() => {
            createArticle({ variables: { payload: { content, title, contentType: ArticleContentType.Markdown } } });
          }}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
