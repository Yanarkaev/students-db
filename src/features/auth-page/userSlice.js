import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  isAdded: false,
};

//Регистрация пользователя(нужно дополнить структуру получаемых данных)
export const signUpUser = createAsyncThunk(
  "user/post",
  async ({ fullname, login, password, department, jobTitle }, thunkAPI) => {
    try {
      const res = await fetch("/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fullname,
          login,
          password,
          department,
          jobTitle,
        }),
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//Авторизация пользователя
export const signInUser = createAsyncThunk(
  "user/auth/post",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //выход из аккаунта
    userLogout: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.signIn = false;
      state.signUp = false;
    },
    //вход в аккаунт
    isUserSignIn: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    resetIsAdded: (state, action) => {
      state.isAdded = false;
    },
  },

  extraReducers: (builder) => {
    builder
      //Регистрация пользователя
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.isAdded = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isAdded = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.error = null;
      })
      //Авторизация пользователя
      .addCase(signInUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem("token");
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signIn = true;
        state.token = action.payload;
      });
  },
});
export const authToken = (state) => state.user.token;
export const { userLogout, isUserSignIn, resetIsAdded } = userSlice.actions;
export default userSlice.reducer;
