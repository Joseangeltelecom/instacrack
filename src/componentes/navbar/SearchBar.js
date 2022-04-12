import React, { useState } from 'react'
import './searchBar.css'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Link } from 'react-router-dom'
import useComponentVisible from '../hooks/useComponentVisible'

const SearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState([])
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true)

  const handleFiltered = (e) => {
    setIsComponentVisible(true)
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setWordEntered('')
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          onChange={handleFiltered}
          value={wordEntered}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>

      {isComponentVisible && filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value) => {
            return (
              <Link to={`/profile/${value.username}`} onClick={clearInput}>
                <div className="header dataItem">
                  <img className="imgProfileBar" src={value.imgProfile} />
                  <p>{value.username}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SearchBar

// import { Autocomplete } from '@mui/material'
// import React from 'react'

// const SearchBar = ({data, placeholder}) => {

//   console.log(data)
//   return (
//     <div className='search'>
//       <div className='searchInput'>
//         <Autocomplete
//         id='custom-input-demo'
//         options={data}
//         getOptionLabel={(option) => option.username}
//         renderInput={(params) => (
//           <div ref={params.InputProps.ref}>
//             <input type="text" {...params.inputProps} placeholder={placeholder} autoFocus="true"/>
//           </div>
//         )}

//         >

//         </Autocomplete>
//       </div>
//     </div>
//   )
// }

// export default SearchBar
