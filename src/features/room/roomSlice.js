import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    isLoading: false, 
    isSuccess: false, 
    isError: false,
    message: "", 
}

// create room
export const createRoom = createAsyncThunk("room/create", async(roomData, thunkApi) => {
    try {
        const res = await fetch("/api/rooms", {
            headers: {
                "Content-Type": "application/json"
            }, 
            method: "POST", 
            body: JSON.stringify(roomData)
        });

        if (!res.ok) {
            const error = await res.json(); // Đọc thông báo lỗi từ phản hồi
            return thunkApi.rejectWithValue(error);
        }

        const data = await res.json(); // Chỉ đọc dữ liệu nếu phản hồi thành công
        return data;

    } catch (error) {
        console.log(error.message);
        return thunkApi.rejectWithValue(error.message);
    }
})

export const roomSlice = createSlice({
    name: "room", 
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }, 
    }, 
    extraReducers: builder => {
        builder
            .addCase(createRoom.pending, (state, action) => {
                console.log("Creating room:", action.payload); // Log payload
                state.isLoading = true;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                console.log("Creating room:", action.payload); // Log payload
                state.isLoading = false;
                state.isSuccess = true;
                state.rooms.push(action.payload); // Thêm phòng mới vào danh sách
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; // Thiết lập thông báo lỗi
            });
    }
})

export const { reset } = roomSlice.actions;
export default roomSlice.reducer;