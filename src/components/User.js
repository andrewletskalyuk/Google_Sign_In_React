import React from 'react'
import PropTypes from 'prop-types'

const User = ({ name, imgUrl }) => {
  return (
    <React.Fragment>
      <p>Привіт користувач - супутник))) Хто ти? Я - {name}!</p>
      <img src={imgUrl} alt="profle" />
    </React.Fragment>
  )
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
}

export { User }