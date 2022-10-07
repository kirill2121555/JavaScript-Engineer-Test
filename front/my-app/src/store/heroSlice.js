import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $host } from '../components/http'

export const axiosHeros = createAsyncThunk(
    'heros/axiosHeros',
    async function (text, { rejectWithValue }) {
        try {
            const { data } = await $host.get(`superheros?serch=${text}`)
            if (!data) {
                throw new Error('Server Error')
            }
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const createHero = createAsyncThunk(
    'heros/createHero',
    async function ({ name_picture, nickname, real_name, origin_description, superpowers, catch_phrase }, { rejectWithValue, dispatch }) {
        try {
            const { data } = await $host.post('superhero', { name_picture, nickname, real_name, origin_description, superpowers, catch_phrase })
            if (!data) {
                throw new Error('Can\'t create hero. Server error')
            }
            dispatch(addHero(data));
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const deleteHero = createAsyncThunk(
    'heros/deleteHero',
    async function ({ id }, { rejectWithValue, dispatch }) {
        try {
            const data = await $host.delete('superhero/' + id)
            if (data.status !== 204) {
                throw new Error('Can\'t delete hero. Server error')
            }
            dispatch(removeHero({ id }));
            return 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const updateHero = createAsyncThunk(
    'heros/updateHero',
    async function ({ id, oldimages, new_name_picture, nickname, real_name, origin_description, superpowers, catch_phrase }, { rejectWithValue, dispatch, getState }) {
        try {
            const { data } = await $host.put('superhero/' + id, { oldimages, new_name_picture, nickname, real_name, origin_description, superpowers, catch_phrase })

            if (!data) {
                throw new Error('Can\'t delete hero. Server error')
            }
            dispatch(putHero(data));
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const heroSlice = createSlice({
    name: 'heros',
    initialState: {
        heros: [],
        status: null,
        error: null,
    },
    reducers: {
        addHero(state, action) {
            state.heros.push({
                id: action.payload._id,
                nickname: action.payload.nickname,
                real_name: action.payload.real_name,
                origin_description: action.payload.origin_description,
                superpowers: action.payload.superpowers,
                catch_phrase: action.payload.catch_phrase,
                name_picture: action.payload.name_picture,
            })
        },
        removeHero(state, action) {
            state.heros = state.heros.filter(hero => hero.id !== action.payload.id)
        },
        putHero(state, action) {
            const hero = state.heros.find(hero => hero => hero.id === action.payload._id)
            hero.nickname = action.payload.nickname
            hero.real_name = action.payload.real_name
            hero.origin_description = action.payload.origin_description
            hero.superpowers = action.payload.superpowers
            hero.catch_phrase = action.payload.catch_phrase
            hero.name_picture = action.payload.name_picture
        }
    },
    extraReducers: {
        [axiosHeros.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [axiosHeros.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.heros = action.payload;
        },
        [axiosHeros.rejected]: setError,
        [deleteHero.rejected]: setError,
        [updateHero.rejected]:setError,
        [createHero.rejected]:setError,
    },
})

export const { addHero, removeHero, putHero } = heroSlice.actions;
export default heroSlice.reducer;