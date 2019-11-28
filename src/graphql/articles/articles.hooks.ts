import { useMutation, useQuery } from '@apollo/react-hooks';

import {
  CreateArticleMutationResult,
  CreateArticleMutationVariables,
  CreateArticleOperation,
  GetArticleByKeyOperation,
  GetArticleByKeyQueryResult,
  GetArticleByKeyQueryVariables,
} from './articles.generated';

export const useCreateArticle = () => {
  const [createArticle, { loading, error }] = useMutation<CreateArticleMutationResult, CreateArticleMutationVariables>(
    CreateArticleOperation,
    {}
  );
  return {
    createArticle,
    loading,
    error,
  };
};

export const useGetArticleByKey = (key: string) => {
  const { loading, error, data } = useQuery<GetArticleByKeyQueryResult, GetArticleByKeyQueryVariables>(
    GetArticleByKeyOperation,
    { variables: { key } }
  );
  return {
    article: !!data && data.getArticle,
    loading,
    error,
  };
};
