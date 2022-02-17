import { Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { uniq, uniqBy, xorBy } from 'lodash';
import { LearningMaterialTag } from '../../../graphql/types';
import { LearningMaterialTagBase } from '../../learning_materials/LearningMaterialTagViewer';
import { Field } from '../../lib/fields/Field';
import { LearningMaterialTagSelector } from '../../lib/inputs/LearningMaterialTagSelector';

const LearningMaterialTagsSuggestions: LearningMaterialTag[] = [
  'Great Introduction',
  'Visual',
  'Practical',
  'In-depth',
  'Interactive',
  'Gamified',
  'Project based',
  'Theoretical',
  'Fun',
  'Vulgarisation',
  'Great illustrations',
  'Intuitive',
].map((name) => ({ name: name.toLocaleLowerCase() }));

export const LearningMaterialTagsField: React.FC<{
  value: LearningMaterialTag[];
  onChange: (tags: LearningMaterialTag[]) => void;
}> = ({ value, onChange }) => {
  return (
    <Field
      label="Tags"
      helperText="What makes this resource great?"
      renderRightOfLabel={
        !!value.length && (
          <Stack direction="row" alignItems="flex-end">
            {value.map((selectedTag) => (
              <LearningMaterialTagBase
                size="md"
                key={selectedTag.name}
                isSelected
                onClick={() => onChange(value.filter((v) => v.name !== selectedTag.name))}
              >
                {selectedTag.name}
              </LearningMaterialTagBase>
            ))}
          </Stack>
        )
      }
    >
      <Wrap spacing={4} align="center" pt={1}>
        {LearningMaterialTagsSuggestions.filter((suggestion) => !value?.find((v) => v.name === suggestion.name)).map(
          (tag) => (
            <WrapItem key={tag.name}>
              <LearningMaterialTagBase
                size="md"
                onClick={() => onChange(uniq(xorBy([...(value || [])], [tag], 'name')))}
              >
                {tag.name}
              </LearningMaterialTagBase>
            </WrapItem>
          )
        )}
        <WrapItem>
          <LearningMaterialTagSelector
            placeholder="Search or create Tag..."
            size="sm"
            width="200px"
            onSelect={(r) => {
              onChange(uniqBy(value.concat({ name: r.name }), 'name'));
            }}
          />
        </WrapItem>
      </Wrap>
    </Field>
  );
};
