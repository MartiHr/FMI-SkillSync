import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Topic.module.css';
import { Link } from 'react-router-dom';
import { calculateTime } from '../../../utils/calculateTime';

let cx = classNames.bind(styles);

export const Topic = ({topic}) => {
  
  
  const { id, title, subject, name, createdAt } = topic;

  return (
    <div className={cx('topic-container')}>
      <h2 className={cx('topic-title')}>{title}</h2>
      <p className={cx('topic-info')}>
        <strong>Subject:</strong> <span className="subject">{subject}</span>
      </p>
      <p className={cx('topic-info')}>
        <strong>Creator:</strong> <span className="creator">{name}</span>
      </p>
      <p className={cx('topic-info')}>
        <strong>Creation Date:</strong> <span className="creation-date">{calculateTime(createdAt)}</span>
      </p>
      <li className={cx('see-discussion')}>
        <Link to={`/discussion/${id}`}>See more...</Link>
      </li>
    </div>
  );
};

// Topic.propTypes = {
//   topic: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     creator: PropTypes.string.isRequired,
//     creationDate: PropTypes.string.isRequired,
//     // Add more properties as needed
//   }).isRequired,
// };

