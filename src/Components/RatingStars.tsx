import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 === 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<StarIcon key={i} style={{ color: 'gold', fontSize: '30px' }} />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<StarHalfIcon key="half" style={{ color: 'gold', fontSize: '30px' }} />);
    } else {
      stars.push(
        <StarIcon
          key={i}
          style={{ color: '#f0eeee', fontSize: '30px' }}
        />
      );
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;