import { CircleNotch } from '@phosphor-icons/react';

type Props = {
  size: number;
};

export const Spinner = ({ size }: Props) => (
  <CircleNotch size={size} className='spin' />
);
