import { Icon, IconProps } from '@chakra-ui/react';
import { MdList } from '@react-icons/all-files/md/MdList';

export const ResourceSeriesIcon = (props: Omit<IconProps, 'css'>) => <Icon as={MdList} {...props} />;
