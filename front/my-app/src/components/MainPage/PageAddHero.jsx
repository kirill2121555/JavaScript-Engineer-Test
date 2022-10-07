import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { $host } from "../http";
import { createHero } from './../../store/heroSlice'

const Pageadd = () => {
    const [nickname, setNickname] = useState('')
    const [real_name, setReal_name] = useState('')
    const [origin_description, setOrigin_description] = useState('')
    const [superpowers, setSuperpowers] = useState('')
    const [catch_phrase, setCatch_phrase] = useState('')
    const [img, setImg] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const click = async () => {
        try {
            const data = new FormData();
            const name_picture = []
            for (let i = 0; i < img.length; i++) {
                let namefile = uuidv4() + '.png'
                name_picture.push(namefile)
                data.append('picture', img[i], namefile);
            }
            await $host.post('/upload', data, {
                headers: {
                    'Content-Type': "mulpipart/form-data"
                }
            })
            await dispatch(createHero({name_picture, nickname, real_name, origin_description, superpowers, catch_phrase}))
            navigate("/")
        } catch (e) {
            console.log(e.message)
        }
    }
    const setpictur = (event) => {
        setImg(event.target.files)
    }
    return (
        <div className="center">
            <div className="formadd">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nickname</label>
                    <input class="form-control" id="exampleFormControlInput1"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}></input>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Real name</label>
                    <input class="form-control" id="exampleFormControlInput1"
                        value={real_name}
                        onChange={e => setReal_name(e.target.value)}>
                    </input>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Origin description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                        value={origin_description}
                        onChange={e => setOrigin_description(e.target.value)}>

                    </textarea>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Superpowers</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1"
                        value={superpowers}
                        onChange={e => setSuperpowers(e.target.value)}>
                    </input>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Catch phrase</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1"
                        value={catch_phrase}
                        onChange={e => setCatch_phrase(e.target.value)}>
                    </input>
                </div>
                <label for="formFileMultiple" class="form-label">Choose a photo to upload</label>
                <input type="file" onChange={setpictur} multiple></input>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary me-md-2" type="button" onClick={click}>Add Superheroer</button>
                </div>
            </div>
        </div>
    );
}

export default Pageadd