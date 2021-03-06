/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import getAverages from '../../Helpers/GetAverageRecs';
import StarRatings from './StarRatings.jsx';
import ProgressBarTable from './ProgressBarTable.jsx';
import CharacteristicsTable from './CharacteristicsTable.jsx';
import getAverageStarRating from '../../Helpers/GetAverageStarRating';

const Ratings = ({ ratingsData, handleClickedStar }) => {
  const [recommendations, setRecommendations] = useState(`${100}%`);
  const [starRating, setStarRating] = useState('0');

  useEffect(() => {
    if (!ratingsData.recommended) {
      setRecommendations(`${100}%`);
      setStarRating('0');
    } else {
      setRecommendations(`${getAverages(ratingsData.recommended)}%`);
      setStarRating(`${getAverageStarRating(ratingsData.ratings)}`);
    }
  });

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Typography variant="h2" component="h3">{starRating}</Typography>
        </Grid>
        <Grid item xs={3}>
          <StarRatings averageRating={starRating} />
        </Grid>
        <Grid item xs={12}>
          <div className="mb-4">
            <Typography variant="subtitle2">
              {recommendations}
              {' '}
              of THR3DERS recommend this product
            </Typography>
          </div>
        </Grid>
      </Grid>
      <ProgressBarTable
        ratingsData={ratingsData}
        handleClickedStar={handleClickedStar}
      />
      <CharacteristicsTable ratingsData={ratingsData} />
    </div>
  );
};

export default Ratings;
