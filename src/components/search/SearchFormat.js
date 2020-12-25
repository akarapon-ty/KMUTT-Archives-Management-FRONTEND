import React, { useState } from 'react'
import PropTypes from 'prop-types'
import bgInput from '../../assets/icon/search_24px.png'
import { SearchInputStyle, SearchText, SearchTextFill } from './style'

export const SearchFormat = (props) => {
  const {
    searchFill, searchTotal, active, manage,
  } = props
  const [stateCurrentFill, setStateCurrentFill] = useState('')

  return (
    <div>

      {
        active ? <SearchInputStyle onChange={(e) => setStateCurrentFill(e.target.value)} bg={bgInput} placeholder={searchFill} value={stateCurrentFill} />
          : (
            <>
              {manage ? <h3>Manage KMUTT Archives</h3> : <h3>Search KMUTT Archives</h3>}
              <SearchInputStyle onChange={(e) => setStateCurrentFill(e.target.value)} bg={bgInput} placeholder={searchFill} value={stateCurrentFill} />
              <SearchText>
                {searchTotal}
                {' '}
                Results found :
                {' '}
                <SearchTextFill>{searchFill}</SearchTextFill>
              </SearchText>
            </>
          )
      }

    </div>

  )
}

export default { }

SearchFormat.defaultProps = {
  searchFill: 'Search . . . ',
  searchTotal: 'searchTotal default',

}

SearchFormat.propTypes = {
  searchFill: PropTypes.string,
  searchTotal: PropTypes.number,
}