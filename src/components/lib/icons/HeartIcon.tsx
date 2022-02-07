import { Icon, IconProps } from '@chakra-ui/icons';
// import { IoHeartOutline } from '@react-icons/all-files/io5/IoHeartOutline';
import { RiHeartAddLine } from '@react-icons/all-files/ri/RiHeartAddLine';

export const HeartIcon = (props: Omit<IconProps, 'css'>) => <Icon as={RiHeartAddLine} {...props} />;
