import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({value, text, color}) => {

  //Create a list of star based on review-score
  const create_star_list = () => {
    let output = [];
    let value_copy = value;
    for(var i = 0; i < 5; i++) {
        value_copy -= 1;
        if (value_copy >= 0){
            output.push(1)
        }else if(value_copy <=0 && value_copy > -1){
            output.push(-value_copy)
        }else{
            output.push(0)
        }  
    }
    return output
  }

  //Based on the value at each entry of the list, paint the star
  return (
    <div className='rating'>
        {create_star_list().map((star_val, index) => 
        (<span key={`${text}/${star_val}/${index}`}>
            <i style={{color: color}} className={
                star_val >= 1
                ? "fa-solid fa-star"
                :star_val >= 0.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
                }></i>
        </span>)
        )}
        <span >{text && text}</span> {/*If there exists text, show it, otherwise show nothing*/}
    </div>
  )
}

Rating.defaultProps ={
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating