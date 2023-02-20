import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  filteredStudents: [],
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
    filterStudents: (state, action) => {
      state.filteredStudents = (function filter() {
        let result = [...state.students];
        let keys = Object.keys(action.payload.data);

        let { isActive, endDate, startDate } = action.payload.timerData;

        if (isActive) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          result = result.filter((student) => {
            const rowDate = new Date(student.changeDate);
            console.log(rowDate >= start && rowDate <= end);
            return rowDate >= start && rowDate <= end;
          });
        }

        keys.forEach((key) => {
          result = result.filter((student) => {
            if (!action.payload.data[key]) {
              return true;
            }
            if (!!Number(student[key])) {
              return Number(student[key]) === Number(action.payload.data[key]);
            }
            if (typeof action.payload.data[key] === "string") {
              return student[key]
                .toLowerCase()
                .includes(action.payload.data[key].toLowerCase());
            }
            return false;
          });
        });
        console.log(result);
        return result;
      })();
    },
    filterReset: (state) => {
      state.filteredStudents = [];
    },
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

export const { filterStudents, filterReset } = studentsSlice.actions;
export const { resetIsAdded } = studentsSlice.actions;
export default studentsSlice.reducer;

export const selectAllstudents = (state) => state.students.students;
export const getError = (state) => state.students.error;
export const getLoading = (state) => state.students.loading;
