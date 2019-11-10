import React from 'react';

interface ArticleProps {
  _id: string;
}

export const Article: React.FC<ArticleProps> = props => {
  return <div>{props._id}</div>;
};
