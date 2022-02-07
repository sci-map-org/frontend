import { Icon, IconProps } from '@chakra-ui/icons';
import { Center, ComponentWithAs, Flex, FlexProps, Text } from '@chakra-ui/react';
import { IconType } from '@react-icons/all-files/lib';
import React from 'react';
import { ResourceType } from '../../graphql/types';
import { LearningPathIcon } from '../lib/icons/LearningPathIcon';
import { ResourceTypeBadge } from '../resources/elements/ResourceType';

export type LearningMaterialType = ResourceType | 'LearningPath';

export const LearningMaterialTypeBadge: React.FC<{ type: LearningMaterialType }> = ({ type }) => {
  return type === 'LearningPath' ? (
    <LearningMaterialTypeBaseBadge icon={LearningPathIcon} name="Learning Path" color="teal" />
  ) : (
    <ResourceTypeBadge type={type} />
  );
};

export const LearningMaterialTypeBaseBadge: React.FC<
  {
    icon: IconType | ComponentWithAs<'svg', IconProps>;
    name: string;
    color: FlexProps['bgColor'];
  } & Omit<FlexProps, 'color'>
> = ({ icon, name, color, ...props }) => {
  return (
    <Flex
      bgColor={`${color}.400`}
      {...props}
      direction="row"
      alignItems="stretch"
      borderRadius={3}
      px="4px"
      pt="2px"
      pb="2px"
      opacity={0.96}
    >
      <Center mr="6px">
        <Icon color="white" as={icon} boxSize="16px" />
      </Center>

      <Center>
        <Text
          color="white"
          fontWeight={400}
          textTransform="uppercase"
          letterSpacing="0.11em"
          fontSize="14px"
          lineHeight="14px"
          height="14px"
        >
          {name}
        </Text>
      </Center>
    </Flex>
  );
};
