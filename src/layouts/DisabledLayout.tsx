import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface Props {
  children: JSX.Element;
}

const DisabledLayout = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user) {
    return <Navigate to="/profile" />;
  }

  return <>{children}</>;
};

export default memo(DisabledLayout);
