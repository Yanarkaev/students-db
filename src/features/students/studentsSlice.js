import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  filteredStudents: [],
  student: {},
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

      const res = await response.json();

      if (res.error) {
        return thunkAPI.rejectWithValue(res.error);
      }

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addStudents = createAsyncThunk(
  "students/addStudents",
  async ({ data, status }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/students/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ data, status }),
      });

      const res = await response.json();

      if (res.error) {
        return thunkAPI.rejectWithValue(res.error);
      }

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const changeStudentData = createAsyncThunk(
  "students/changeStudent",
  async ({ id, data }, thunkAPI) => {
    const newData = {
      ...data,
      relocation:
        data.status !== "Перевод" ? { from: "", to: "" } : data.relocation,
      details: data.status !== "Отчислен" ? "" : data.details,
    };
    try {
      const response = await fetch(
        "http://localhost:3001/students/student/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newData),
        }
      );

      const res = await response.json();

      if (res.error) {
        return thunkAPI.rejectWithValue(res.error);
      }

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStudentById = createAsyncThunk(
  "students/getStudentById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:3001/students/student/" + id
      );
      const data = await response.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data;
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

        let { endDate, startDate } = action.payload.timerData;

        if (endDate && startDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          result = result.filter((student) => {
            if (start > end) {
              return false;
            }
            const rowDate = new Date(student.changeDate);
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
      })
      .addCase(addStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
      })
      .addCase(addStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAdded = false;
      })
      .addCase(fetchStudents.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeStudentData.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeStudentData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.student = action.payload;
      })
      .addCase(changeStudentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      })
      .addCase(getStudentById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.student = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // state.error = action.error.message;
      });
  },
});

export const { filterStudents, filterReset } = studentsSlice.actions;
export const { resetIsAdded } = studentsSlice.actions;
export default studentsSlice.reducer;

export const selectAllstudents = (state) => state.students.students;
export const getStudent = (state) => state.students.student;
export const getError = (state) => state.students.error;
export const getLoading = (state) => state.students.loading;
