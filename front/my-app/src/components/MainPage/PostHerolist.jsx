import React from "react";
import PostHero from './PostHero';

const PostHerolist = (props) => {
    return (
        <div>
            {props.hero.map((hero) => <PostHero hero={hero} key={hero._id}/>)}
        </div>
    );
}
export default PostHerolist