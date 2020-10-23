import gql from "graphql-tag";
import { LearningPathDataFragment } from "./learning_paths.fragments.generated";

export const LearningPathData = gql`
  fragment LearningPathData on LearningPath {
    _id
    key
    name
    description
  }
`;

export const generateLearningPathData = (): LearningPathDataFragment => ({
  _id: Math.random().toString(),
  key: Math.random().toString(),
  name: 'Learning Path'
})