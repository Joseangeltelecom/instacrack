import React, { useState } from 'react'
import "./searchBar.css"
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';


const SearchBar = ({placeholder, data}) => {
  const [filteredData, setFilteredData] = useState([])
  const [wordEntered, setWordEntered] = useState([])

  const handleFiltered = (e) => {
    const searchWord = e.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value) => {
        return value.username.toLowerCase().includes(searchWord.toLowerCase())
    })

    if(searchWord === ""){
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setWordEntered("")
  }
 
  return (
    <div className='search'>
      <div className='searchInputs'>
        <input type="text" placeholder={placeholder} onChange={handleFiltered} value={wordEntered}/>
        <div className='searchIcon'>
          {filteredData.length === 0 ? <SearchIcon /> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
          </div>
      </div>

      {filteredData.length != 0 && 
      <div className='dataResult'>
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
      }
    </div>
  );
}
 
export default SearchBar