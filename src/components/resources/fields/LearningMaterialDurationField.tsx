import { Field } from '../../lib/fields/Field';
import { DurationInput } from '../elements/Duration';

export const LearningMaterialDurationField: React.FC<{
  value?: number | null;
  onChange: (durationSeconds: number | null) => void;
}> = ({ value, onChange }) => {
  return (
    <Field label="Duration">
      <DurationInput value={value} onChange={onChange} />
    </Field>
  );
};
