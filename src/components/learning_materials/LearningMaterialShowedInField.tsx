import { CloseIcon } from '@chakra-ui/icons';
import { FormErrorMessage, IconButton, Link, Stack, Text, useOutsideClick } from '@chakra-ui/react';
import { uniqBy } from 'lodash';
import { useRef, useState } from 'react';
import { TopicLinkDataFragment } from '../../graphql/topics/topics.fragments.generated';
import { Field } from '../lib/fields/Field';
import { EditLinkStyleProps, ShowedInTopicHeading } from '../lib/Typography';
import { TopicSelector } from '../topics/TopicSelector';

export const LearningMaterialShowedInField: React.FC<{
  value: TopicLinkDataFragment[];
  onChange: (showedInTopics: TopicLinkDataFragment[]) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}> = ({ isInvalid, value, onChange, errorMessage }) => {
  const [editShowedInTopics, setEditShowedInTopics] = useState(false);
  const showedInTopicFieldRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: showedInTopicFieldRef,
    handler: () => {
      setEditShowedInTopics(false);
    },
    enabled: !!editShowedInTopics,
  });
  return (
    <Field label="Show In" isInvalid={isInvalid}>
      <Stack pl={3}>
        {editShowedInTopics ? (
          <Stack ref={showedInTopicFieldRef} w="80%">
            {value.map((showedInTopic) => (
              <Stack key={showedInTopic._id} direction="row" alignItems="center">
                <IconButton
                  size="xs"
                  variant="icon"
                  icon={<CloseIcon />}
                  aria-label="Remove"
                  onClick={() => onChange(value.filter((showInTopic) => showInTopic._id !== showedInTopic._id))}
                />
                <ShowedInTopicHeading pb={1}>{showedInTopic.name}</ShowedInTopicHeading>
              </Stack>
            ))}
            <TopicSelector
              placeholder="Select a Topic..."
              onSelect={(selectedTopic) => {
                onChange(uniqBy(value.concat([selectedTopic]), '_id'));
              }}
            />
          </Stack>
        ) : (
          <>
            {value.map((showedInTopic) => (
              <ShowedInTopicHeading key={showedInTopic._id} pb={1}>
                - {showedInTopic.name}
              </ShowedInTopicHeading>
            ))}
            {!value.length && (
              <Text color="red.500" fontWeight={500}>
                No Topic selected
              </Text>
            )}
          </>
        )}
      </Stack>
      {!editShowedInTopics && (
        <Link {...EditLinkStyleProps} mt="8px" onClick={() => setEditShowedInTopics(true)} ml="2px">
          (change)
        </Link>
      )}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </Field>
  );
};
