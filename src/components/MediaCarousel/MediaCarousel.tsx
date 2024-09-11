import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface PostCarouselProps {
  media: string[];
}

const PostCarousel: React.FC<PostCarouselProps> = ({ media }) => {
  const showControls = media.length > 1;

  return (
    <Carousel indicators={showControls} controls={showControls}>
      {media.map((url, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={url} alt={`Slide ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PostCarousel;

