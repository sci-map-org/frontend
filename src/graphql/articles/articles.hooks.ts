import { useMutation, useQuery } from '@apollo/react-hooks';

import {
  CreateArticleMutationResult,
  CreateArticleMutationVariables,
  CreateArticleOperation,
  GetArticleByKeyOperation,
  GetArticleByKeyQueryResult,
  GetArticleByKeyQueryVariables,
  ListUserArticlePreviewsQueryResult,
  ListUserArticlePreviewsOperation,
  ListUserArticlePreviewsQueryVariables,
  UpdateArticleMutationResult,
  UpdateArticleMutationVariables,
  UpdateArticleOperation,
  DeleteArticleMutationResult,
  DeleteArticleMutationVariables,
  DeleteArticleOperation,
} from './articles.generated';

export const useCreateArticle = () => {
  const [createArticle, { loading, error, data }] = useMutation<
    CreateArticleMutationResult,
    CreateArticleMutationVariables
  >(CreateArticleOperation, {});
  return {
    createArticle,
    loading,
    error,
    createdArticle: data && data.createArticle,
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

export const useUpdateArticle = () => {
  const [updateArticle, { loading, error }] = useMutation<UpdateArticleMutationResult, UpdateArticleMutationVariables>(
    UpdateArticleOperation,
    {}
  );
  return {
    updateArticle,
    loading,
    error,
  };
};

export const useDeleteArticle = () => {
  const [deleteArticle, { loading, error }] = useMutation<DeleteArticleMutationResult, DeleteArticleMutationVariables>(
    DeleteArticleOperation,
    {
      update: (cache, result) => {
        console.log(cache);
        console.log(result);
        //.writeQuery({query: ListUserArticlePreviewsOperation, data})
      },
    }
  );
  return {
    deleteArticle,
    loading,
    error,
  };
};

export const useListUserArticlePreviews = (userKey: string) => {
  const { loading, error, data, fetchMore } = useQuery<
    ListUserArticlePreviewsQueryResult,
    ListUserArticlePreviewsQueryVariables
  >(ListUserArticlePreviewsOperation, {
    variables: {
      userKey,
      options: {},
    },
  });

  return {
    articlePreviews: !!data && !!data.getUser.articles && data.getUser.articles.items,
    loading,
    error,
    fetchMore,
  };
};
