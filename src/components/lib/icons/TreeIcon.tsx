import { Icon, IconProps } from '@chakra-ui/icons';

export const TreeIcon = (
  props: Omit<IconProps, 'css'> // ts bug with emotion, checkout https://github.com/emotion-js/emotion/issues/1640
) => (
  <Icon viewBox="0 0 20 20" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.33333 1.66992C8.79333 1.66992 9.16667 2.04326 9.16667 2.50326V5.83659C9.16667 6.29659 8.79333 6.66992 8.33333 6.66992H6.66667V8.33659H10.8333V7.50326C10.8333 7.04326 11.2067 6.66992 11.6667 6.66992H16.6667C17.1267 6.66992 17.5 7.04326 17.5 7.50326V10.8366C17.5 11.2966 17.1267 11.6699 16.6667 11.6699H11.6667C11.2067 11.6699 10.8333 11.2966 10.8333 10.8366V10.0033H6.66667V15.0033H10.8333V14.1699C10.8333 13.7099 11.2067 13.3366 11.6667 13.3366H16.6667C17.1267 13.3366 17.5 13.7099 17.5 14.1699V17.5033C17.5 17.9633 17.1267 18.3366 16.6667 18.3366H11.6667C11.2067 18.3366 10.8333 17.9633 10.8333 17.5033V16.6699H5.83333C5.37333 16.6699 5 16.2966 5 15.8366V6.66992H3.33333C2.87333 6.66992 2.5 6.29659 2.5 5.83659V2.50326C2.5 2.04326 2.87333 1.66992 3.33333 1.66992H8.33333ZM15.8333 15.0033H12.5V16.6699H15.8333V15.0033ZM15.8333 8.33659H12.5V10.0033H15.8333V8.33659ZM7.5 3.33659H4.16667V5.00326H7.5V3.33659Z"
      fill="currentColor"
    />
  </Icon>
);