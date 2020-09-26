import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import getAverages from '../../Helpers/GetAverageRecs';
import StarRatings from './StarRatings.jsx';

const Ratings = (props) => {
  const [recommendations, setRecommendations] = useState(`${100}%`);
  const [starRating, setStarRating] = useState('4.0');

  useEffect(() => {
    if (!props.ratingsData.recommended) {
      setRecommendations(`${100}%`);
    } else {
      setRecommendations(`${getAverages(props.ratingsData.recommended)}%`);
    }
  });

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <h4>Ratings & Reviews</h4>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h2" component="h3">{starRating}</Typography>
        </Grid>
        <Grid item xs={3}>
          <StarRatings />
        </Grid>
        <Grid item xs={12}>
          <p>
            {recommendations}
            {' '}
            of SCRUMDOGS recommend this product
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Ratings;
