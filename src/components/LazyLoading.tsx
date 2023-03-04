import React, { memo } from 'react';
import {
  LazyLoadImage,
  LazyLoadComponent,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  className?: string;
}

interface Props2 {
  children: JSX.Element;
}

const ImageLazyLoading = memo((props: Props) => {
  return <LazyLoadImage {...props} effect="blur" />;
});

const ComponentLazyLoading = memo(({ children }: Props2) => {
  return (
    <LazyLoadComponent
      beforeLoad={() => {
        return <li>Cuoc song ma</li>;
      }}
    >
      {children}
    </LazyLoadComponent>
  );
});

export { ImageLazyLoading, ComponentLazyLoading };
