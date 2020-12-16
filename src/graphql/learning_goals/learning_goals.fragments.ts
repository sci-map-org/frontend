import gql from 'graphql-tag';

export const LearningGoalData = gql`
  fragment LearningGoalData on LearningGoal {
    _id
    name
    description
    key
  }
`;
