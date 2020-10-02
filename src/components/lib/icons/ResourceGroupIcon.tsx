import { Icon, IconProps } from '@chakra-ui/core';
import { MdViewModule } from 'react-icons/md';

export const ResourceGroupIcon: React.FC<IconProps> = (props) => <Icon as={MdViewModule} {...props} />;
