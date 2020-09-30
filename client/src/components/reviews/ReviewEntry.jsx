/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';
import shortenReviewFunc from '../../Helpers/ShortenReviewFunc';

import markReviewAsHelpful from '../../API/MarkRevAsHelpful';
import ImageModal from './ImageModal.jsx';

const HelperButton = styled.button`
cursor: pointer;
padding: 0px 0px;
color: #5eaaa8;
background: transparent;
border: 0px;
font-size: 16px;
border-radius: 0px;
outline: none !important;

&:hover {
  background-color: transparent;
  border: 0px;
  textDecoration: none;
  color: black;
  box-shadow: 0 0px;
`;

const ReviewEntry = (props) => {
  if (props.review !== undefined) {
    const { review } = props;
    const [response, setResponse] = useState(review.response);
    const [responseTitle, setResponseTitle] = useState('Response: ');
    const [helpfulness, setHelpfulness] = useState(review.helpfulness);
    const [reviewBody, setReviewBody] = useState(review.body);
    const [photos, setPhotos] = useState(review.photos);
    const [hasPhotos, setHasPhotos] = useState(false);
    const [shortened, setShortened] = useState(false);
    const [clickedPhoto, setClickedPhoto] = useState('');

    useEffect(() => {
      if (reviewBody.split('').length > 250) {
        setReviewBody(shortenReviewFunc(reviewBody));
        setShortened(true);
      } else {
        setShortened(null);
      }
    }, []);

    useEffect(() => {
      if (photos.length > 0) {
        setHasPhotos(true);
      }
    }, []);

    const onHelpfulButtonClick = () => {
      setHelpfulness(helpfulness + 1);
      markReviewAsHelpful(review.review_id);
    };

    const onShowMoreClick = () => {
      if (shortened) {
        setReviewBody(review.body);
        setShortened(false);
      } else {
        setReviewBody(shortenReviewFunc(reviewBody));
        setShortened(true);
      }
    };

    const dateConverter = () => {
      const id = new Date(review.date);
      const day = `${id.getDate()}th`;
      const month = id.getMonth();
      const year = id.getFullYear();
      console.log(`${month} ${day} ${year}`);
      console.log(reviewBody);
      console.log(clickedPhoto);
    };

    const handleImageOpen = (event) => {
      setClickedPhoto(event.target.src);
    };

    if (response === 'null' || response === null) {
      setResponse('');
      setResponseTitle('');
    }

    return (
      <>
        <Grid container direction="column">
          <Grid item xs={6} lg={3}>
            <Rating name="half-rating-read" precision={0.25} value={review.rating} readOnly size="small" />
          </Grid>
          <Grid item xs={6} lg={9}>
            <Typography variant="caption">{review.reviewer_name}</Typography>
          </Grid>
          <div className="mt-3">
            <Grid item xs={12}>
              <Typography variant="h6">{review.summary}</Typography>
            </Grid>
          </div>
          <div className="mt-3">
            <Grid item xs={12}>
              <Typography variant="body2">{reviewBody}</Typography>
              {shortened
                ? (
                  <HelperButton
                    onClick={onShowMoreClick}
                    className="mt-2"
                  >
                    Say more
                  </HelperButton>
                )
                : (
                  <div> </div>
                )}
            </Grid>
          </div>
          <div
            className="mt-3 p-3"
            style={{
              backgroundColor: '#fffefc',
            }}
          >
            <Grid item xs={12}>
              <Typography variant="body2">{responseTitle}</Typography>
              <Typography variant="body2">{response}</Typography>
            </Grid>
          </div>
          <div className="mt-3">
            {hasPhotos
              ? photos.map((photo) => (
                <ImageModal key={photo.id} photoId={photo.id} photoUrl={photo.url} />
              ))
              : <div /> }
          </div>
          <div className="mt-5">
            <Grid item xs={12} lg={12}>
              <Typography variant="overline">Helpful? --</Typography>
              <HelperButton className="px-2" onClick={onHelpfulButtonClick}>
                {' '}
                Yes (
                {helpfulness}
                )
                {' '}
              </HelperButton>
              <HelperButton variant="caption" onClick={dateConverter}> Report </HelperButton>
            </Grid>
          </div>
        </Grid>
        <div className="my-3">
          <Divider />
        </div>
      </>
    );
  }
  return (
    <div>...</div>
  );
};

export default ReviewEntry;
