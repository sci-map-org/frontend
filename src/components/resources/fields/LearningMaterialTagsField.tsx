import { Stack, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import { uniq, uniqBy, xor, xorBy } from 'lodash';
import { LearningMaterialTag } from '../../../graphql/types';
import { LearningMaterialTagBase, LearningMaterialTagViewer } from '../../learning_materials/LearningMaterialTagViewer';
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
      // isInvalid={isInvalid}
      renderRightOfLabel={
        !!value.length && (
          <Stack direction="row" alignItems="flex-end">
            {value.map((selectedTag) => (
              <LearningMaterialTagBase
                size="md"
                key={selectedTag.name}
                isSelected
                //   isSelected={!!value.find((v) => v.name === tag.name)}
                onClick={() => onChange(value.filter((v) => v.name !== selectedTag.name))}
                //   onClick={() => onChange(uniq(xorBy([...(value || [])], [tag], 'name')))}
              >
                {selectedTag.name}
              </LearningMaterialTagBase>
            ))}
          </Stack>
        )
      }
    >
      <Wrap spacing={4} align="center" pt={1}>
        {/* {uniq([...LearningMaterialTagsSuggestions, ...value]) */}
        {LearningMaterialTagsSuggestions.filter((suggestion) => !value?.find((v) => v.name === suggestion.name)).map(
          (tag) => (
            <WrapItem key={tag.name}>
              <LearningMaterialTagBase
                size="md"
                //   isSelected={!!value.find((v) => v.name === tag.name)}
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
            // isDisabled={isDisabled}
            size="sm"
            width="200px"
            onSelect={(r) => {
              onChange(uniqBy(value.concat({ name: r.name }), 'name'));
              //   onSelect && onSelect({ name: r.name });
            }}
          />
        </WrapItem>
      </Wrap>
    </Field>
  );
};
