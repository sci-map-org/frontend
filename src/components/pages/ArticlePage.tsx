import React from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';

export const articlePagePath = (key = ':key') => `/article/${key}`;

export const ArticlePage: React.FC<{}> = props => {
  const { key } = useParams();
  return <Grid>{key}</Grid>;
};
