import React from 'react';

const getStar = (rating) => {
    const FULL_STAR = "fas fa-star";
    const HALF_STAR = "fas fa-star-half-alt";
    const EMPTY_STAR = "far fa-star";

    let starType = EMPTY_STAR;

    if(rating >= 1)
        starType = FULL_STAR;
    else if(rating >= 0.5)
        starType = HALF_STAR;

    return (
        <span key={rating}>
            <i className={"product--star " + starType}/>
        </span>
    )
}

const getStars = (rating) => {
    if (rating === undefined){
        return
    }


    const STAR_COUNT = 5;

    let starsHTML = [];
    for(let i = 0; i < STAR_COUNT; i++){
        starsHTML.push(getStar(rating));
        rating--;
    }

    return starsHTML;
}

const Review = ({ rating, text }) => (
    <div>
        {getStars(rating)}
        {text && text}
    </div>
)

export default Review;
