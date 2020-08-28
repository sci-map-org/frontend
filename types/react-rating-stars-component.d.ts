declare module 'react-rating-stars-component' {
  export default class ReactStarsRatingComponent extends React.Component<{
    count?: number;
    value?: number;
    char?: string;
    color?: string;
    activeColor?: string;
    size?: string | number;
    edit?: boolean;
    isHalf?: boolean;
    emptyIcon?: JSX.Element; // ? right type ?
    halfIcon?: JSX.Element;
    filledIcon?: JSX.Element;
    a11y?: boolean;
    onChange?: (newRating: number) => void;
  }> {}
}
