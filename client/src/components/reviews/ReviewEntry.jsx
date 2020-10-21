/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import shortenReviewFunc from '../../Helpers/ShortenReviewFunc';
import dateConverter from '../../Helpers/DateConverter';

import markReviewAsHelpful from '../../API/MarkRevAsHelpful';
import ImageModal from './ImageModal.jsx';

const ReviewEntry = ({ review, input }) => {
  if (review !== undefined) {
    const [response, setResponse] = useState(review.response);
    const [responseTitle, setResponseTitle] = useState('Response: ');
    const [helpfulness, setHelpfulness] = useState(review.helpfulness);
    const [reviewBody, setReviewBody] = useState(review.body);
    const [photos, setPhotos] = useState(review.photos);
    const [hasPhotos, setHasPhotos] = useState(false);
    const [shortened, setShortened] = useState(false);
    const [clickedPhoto, setClickedPhoto] = useState('');
    const [highlightedBody, setHighlightedBody] = useState(null);
    const [textInput, setTextInput] = useState(input);
    const [date, setDate] = useState('');

    const highlightText = (query) => {
      const lowerCaseBody = reviewBody.toLowerCase();
      if (query !== null && lowerCaseBody.includes(query)) {
        setHighlightedBody(lowerCaseBody);
      }
    };

    useEffect(() => {
      if (reviewBody.split('').length > 250) {
        setReviewBody(shortenReviewFunc(reviewBody));
        setShortened(true);
      } else {
        setShortened(null);
      }
      setDate(dateConverter(review.date));
    }, []);

    useEffect(() => {
      if (photos.length > 0) {
        setHasPhotos(true);
      }
    }, []);

    useEffect(() => {
      if (textInput !== null) {
        highlightText(textInput);
      }
    }, [input]);

    const onHelpfulButtonClick = () => {
      setHelpfulness(helpfulness + 1);
      markReviewAsHelpful(review._id);
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

    if (response === 'null' || response === null) {
      setResponse('');
      setResponseTitle('');
    }

    return (
      <>
        <Grid container direction="row">
          <Grid item xs={6} lg={8}>
            <Rating name="half-rating-read" precision={0.25} value={review.rating} readOnly size="small" />
          </Grid>
          <Grid item xs={6} lg={4}>
            <Typography variant="caption">
              {review.name}
              {' '}
              {date}
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column">
          <div className="mt-3">
            <Grid item xs={12}>
              <Typography variant="h6">{review.summary}</Typography>
            </Grid>
          </div>
          <div className="mt-3">
            <Grid item xs={12}>
              {highlightedBody !== null
                ? (
                  <div>
                    {highlightedBody.split(' ').map((word) => {
                      if (word.includes(textInput)) {
                        return (
                          <span key={Math.random()} style={{ color: '#a29b93' }}>{`${word} `}</span>
                        );
                      }
                      return (
                        <span key={Math.random()} style={{ color: '#056676' }}>{`${word} `}</span>
                      );
                    })}
                  </div>
                )
                : <Typography variant="body2">{reviewBody}</Typography>}
              {shortened
                ? (
                  <button
                    className="zd-helper-button-large mt-2"
                    type="button"
                    onClick={onShowMoreClick}
                  >
                    Say more
                  </button>
                )
                : (
                  <div> </div>
                )}
            </Grid>
          </div>
          {review.recommend === 1
            ? (
              <div className="mt-2">
                <Grid item xs={12}>
                  <img src="https://i.ibb.co/02g1LhD/Screen-Shot-2020-10-09-at-7-19-51-PM.png" alt="recommended product" />
                </Grid>
              </div>
            ) : <div> </div>}
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
              <button className="zd-helper-button px-2" type="button" onClick={onHelpfulButtonClick}>
                {' '}
                Yes (
                {helpfulness}
                )
                {' '}
              </button>
              <button className="zd-helper-button" type="button" variant="caption" onClick={dateConverter}> Report </button>
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
