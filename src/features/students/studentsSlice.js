import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/students");
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const fetchStudentsByStatus = createAsyncThunk(
  "students/fetchStudentsByStatus",
  async (status, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3001/students/status/${status}`
      );
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addStudents = createAsyncThunk(
  "students/addStudents",
  async (studentData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(studentData),
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
  reducers: {},
  extraReducers(builder) {
    builder
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
      })
      .addCase(fetchStudentsByStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStudentsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.concat(action.payload);
      })
      .addCase(addStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;

export const selectAllstudents = (state) => state.students.students;
export const getError = (state) => state.students.error;
export const getLoading = (state) => state.students.loading;
