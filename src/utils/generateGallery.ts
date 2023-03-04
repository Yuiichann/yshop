import { ReactImageGalleryItem } from 'react-image-gallery';

function generateGallery(images: string[], alt: string) {
  return images.map((item) => {
    return {
      original: item,
      thumbnail: item,
      thumbnailAlt: alt,
      originalAlt: alt,
      loading: 'lazy',
      thumbnailLoading: 'lazy',
      bulletClass: 'bg-primary',
    } as ReactImageGalleryItem;
  });
}

export default generateGallery;
