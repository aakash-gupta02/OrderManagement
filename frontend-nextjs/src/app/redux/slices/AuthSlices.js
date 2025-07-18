import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://order-management-dxob.onrender.com/auth/admin/login', { email, password });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        admin: null,
        token: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.admin = action.payload.admin;
                state.token = action.payload.token;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.error || 'Login failed';
            });
    }
});

export const { logoutAdmin } = authSlice.actions;

export default authSlice.reducer;

