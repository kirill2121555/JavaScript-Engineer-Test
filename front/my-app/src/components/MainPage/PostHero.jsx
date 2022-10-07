import React from 'react';
import { NavLink } from 'react-router-dom';

const PostHero = (props) => {

    return (
        <div className='center'>
            <div className='formadd'>
                <h2 class="card-header"><i>{props.hero.nickname}</i></h2>
                {props.hero.images && props.hero?.images?.length !== 0
                        ?
                        <div><img width='350px' src={`http://localhost:5000/images/${props.hero?.images[0]}`} alt="pict"></img></div>
                        :
                        <div><img width='350px' src={`http://localhost:5000/images/def.png`} alt="pict"></img></div>
                }
                <NavLink to={'/superhero/' + props.hero._id}><button type="button" class="btn btn-primary">More</button></NavLink>
            </div>
            <br></br>
        </div>
    );
}
export default PostHero