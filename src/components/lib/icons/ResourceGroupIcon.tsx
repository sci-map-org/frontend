import { Icon, IconProps } from '@chakra-ui/react';
import { MdViewModule } from '@react-icons/all-files/md/MdViewModule';

export const ResourceGroupIcon = (props: Omit<IconProps, 'css'>) => <Icon as={MdViewModule} {...props} />;
