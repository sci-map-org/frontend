import { useDeleteLearningPathMutation } from "./learning_paths.operations.generated";

export const useDeleteLearningPath = () => {
    const [deleteLearningPath, { loading, error }] = useDeleteLearningPathMutation({
        //   update: (a, { data }) => {
        // console.log(a, data && data.deleteLearningPath._id);
        //   },
    });

    return {
        deleteLearningPath,
        loading,
        error,
    };
};