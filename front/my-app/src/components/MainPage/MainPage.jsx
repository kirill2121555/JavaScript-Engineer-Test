import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination';
import PostHerolist from './PostHerolist';
import { axiosHeros } from './../../store/heroSlice'

const MainPage = () => {
  const [textsearch, settextsearch] = useState([])
  const [indicate, Setindicate] = useState('')
  const [page, setPage] = useState(1)
  const [heroesOnPage] = useState(5)

  const { status, error } = useSelector(state => state.heros)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(axiosHeros(textsearch))
    Setindicate('')
  }, [indicate]);
  const heroes = useSelector(state => state.heros.heros)

  const heroesPerPage = page * heroesOnPage
  const firstheroIndex = heroesPerPage - heroesOnPage
  const currentHeroes = heroes.slice(firstheroIndex, heroesPerPage)
  const paginat = pageNumber => setPage(pageNumber)

  return (
    <div>
      <div class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Input nickname" aria-label="Search"
          value={textsearch}
          onChange={e => settextsearch(e.target.value)}
        ></input>
        <button class="btn btn-outline-success" type="submit" onClick={() => Setindicate(true)}>Search</button>
      </div>

      {status === 'loading' && <h1>Loading...</h1>}
      {error && <h1>An Error Occured:{error}</h1>}

      {currentHeroes.length === 0 ? <h1>Superheroes not found</h1> :
        <div>
          <div>
            <PostHerolist hero={currentHeroes} />
          </div>
          <Pagination
            heroesOnPage={heroesOnPage}
            totalHero={heroes.length}
            paginate={paginat}
          />    </div>
      }
    </div>
  )
}

export default MainPage