import gql from 'graphql-tag';
import { LearningGoalType } from '../types';
import { LearningGoalDataFragment } from './learning_goals.fragments.generated';

export const LearningGoalData = gql`
  fragment LearningGoalData on LearningGoal {
    _id
    key
    name
    hidden
    type
    description
    publishedAt
  }
`;

export const LearningGoalLinkData = gql`
  fragment LearningGoalLinkData on LearningGoal {
    _id
    key
    name
    type
    # domain {
    #   domain {
    #     ...DomainLinkData
    #   }
    # }
  }
`;

export const generateLearningGoalData = (): LearningGoalDataFragment => ({
  _id: Math.random().toString(),
  key: Math.random().toString(),
  type: LearningGoalType.Roadmap,
  hidden: false,
  name: 'Learning Goal',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
});
