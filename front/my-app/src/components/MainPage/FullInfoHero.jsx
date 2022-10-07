import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { superhero } from '../http/requests_api';
import { v4 as uuidv4 } from 'uuid';
import { $host } from '../http';
import { useDispatch } from 'react-redux';
import { deleteHero, updateHero } from '../../store/heroSlice'

const FullInfoHero = () => {

    const dispatch = useDispatch()
    const [hero, setHero] = useState([])
    const [nickname, setNickname] = useState('')
    const [real_name, setReal_name] = useState('')
    const [origin_description, setOrigin_description] = useState('')
    const [superpowers, setSuperpowers] = useState('')
    const [catch_phrase, setCatch_phrase] = useState('')
    const [iimmgg, setiimmgg] = useState([])
    const [img, setImg] = useState([])
    const navigate = useNavigate();
    const { id } = useParams()

    useEffect(() => {
        superhero(id).then(data => {
            setHero(data)
            setNickname(data.nickname)
            setReal_name(data.real_name)
            setOrigin_description(data.origin_description)
            setSuperpowers(data.superpowers)
            setCatch_phrase(data.catch_phrase)
        })
    }, []);

    const delete_hero = async (id) => {
        await dispatch(deleteHero({ id }))
        navigate("/")
    }

    const update = async (id) => {
        try {
            const oldimages = hero.images.filter((el) => !iimmgg.includes(el));
            const data = new FormData();
            const new_name_picture = []
            for (let i = 0; i < img.length; i++) {
                let namefile = uuidv4() + '.png'
                new_name_picture.push(namefile)
                data.append('picture', img[i], namefile);
            }
            await $host.post('/upload', data, {
                headers: {
                    'Content-Type': "mulpipart/form-data"
                }
            })
            await dispatch(updateHero({ id, oldimages, new_name_picture, nickname, real_name, origin_description, superpowers, catch_phrase }))
                .then(window.location.reload())
        }
        catch (e) {
            console.log(e.message)
        }
    }
    const setpictur = (event) => {
        setImg(event.target.files)
    }
    return (
        <div className='center'>
            <div className='formfullpost'>
                <h2 class="card-header">{hero.nickname}</h2>
                <div class="card-body">
                    <p class="clip">Real name: {hero.real_name}</p>
                    <p>Origin description: {hero.origin_description} </p>
                    <p>Superpowers: {hero.superpowers} </p>
                    <p>Catch phrase: {hero.catch_phrase}</p>
                    {hero.images?.map(image =>
                        <div>
                            <img width='1000px' src={`http://localhost:5000/images/${image}`} alt="pict"></img>
                            <br></br>
                            <br></br>
                        </div>
                    )}
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#we${hero._id}`}>Update</button>
                    <button type="button" class="btn btn-primary" onClick={() => { delete_hero(hero._id) }}>Delete</button>
                </div>
            </div>
            <br></br>

            <div class="modal fade" id={`we${hero._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">SUPERHERO</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">Nickname</label>
                            <input class="form-control" id="exampleFormControlInput1"
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}></input>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlTextarea1" class="form-label">Real name</label>
                            <input class="form-control" id="exampleFormControlInput1"
                                value={real_name}
                                onChange={e => setReal_name(e.target.value)}>
                            </input>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">Origin description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                value={origin_description}
                                onChange={e => setOrigin_description(e.target.value)}></textarea>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">Superpowers</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1"
                                value={superpowers}
                                onChange={e => setSuperpowers(e.target.value)}>
                            </input>
                        </div>
                        <div class="modal-body">
                            <label for="exampleFormControlInput1" class="form-label">Catch phrase</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1"
                                value={catch_phrase}
                                onChange={e => setCatch_phrase(e.target.value)}>
                            </input>
                        </div>
                        <label for="formFileMultiple" class="form-label">Choose a photo to upload</label>

                        <div className='center'> <input type="file" onChange={setpictur} multiple></input></div>
                        <br></br>
                        {hero.images?.map(image =>
                            <div>
                                <img width='140px' src={`http://localhost:5000/images/${image}`} alt="pict"></img>
                                {iimmgg?.includes(image)
                                    ? <tt>Picture deleted</tt>
                                    :
                                    <button type="button" class="btn btn-primary" onClick={() => { setiimmgg([...iimmgg, image]) }}>Delete picture</button>
                                }
                            </div>
                        )}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setiimmgg('') }}>Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => { update(id) }}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FullInfoHero