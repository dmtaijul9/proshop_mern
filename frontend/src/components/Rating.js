import React from "react";

const ratingValidateArr = [
  { full: 1, half: 0.5 },
  { full: 2, half: 1.5 },
  { full: 3, half: 2.5 },
  { full: 4, half: 3.5 },
  { full: 5, half: 4.5 },
];

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      {ratingValidateArr.map((rat) => {
        return (
          <span key={rat.full}>
            <i
              style={{ color }}
              className={
                value >= rat.full
                  ? "fas fa-star"
                  : value >= rat.half
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            ></i>
          </span>
        );
      })}
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
