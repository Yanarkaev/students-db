import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  loading: false,
  error: null,
  isAdded: false,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (title, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3001/students/status/${title}`
      );
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addStudents = createAsyncThunk(
  "students/addStudents",
  async (data, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const studentsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetIsAdded: (state, action) => {
      state.isAdded = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addStudents.pending, (state, action) => {
        state.loading = true;
        state.isAdded = false;
        console.log(action);
      })
      .addCase(addStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.concat(action.payload);
        state.isAdded = true;
        console.log(action);
      })
      .addCase(addStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAdded = false;
        console.log(action);
      })
      .addCase(fetchStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetIsAdded } = studentsSlice.actions;
export default studentsSlice.reducer;

export const selectAllstudents = (state) => state.students.students;
export const getError = (state) => state.students.error;
export const getLoading = (state) => state.students.loading;
