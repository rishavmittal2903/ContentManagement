import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IContentField, IContentState } from "../../interfaces/IField";
import axios from "axios";

// Define a type for the slice state

// Define the initial state using that type
const initialState: IContentState = {
  contentData: [],
};
export const fetchContentData = createAsyncThunk(
  "users/fetchContentData",
  // if you type your function argument here
  async () => {
    try {
      const response = await axios.get(
        `https://contentmanagementservice.onrender.com/ContentManagement`,
      );
      if (response.status === 200) {
        return response.data?.contentData;
      } else {
        return response.status;
      }
    } catch (err) {
      throw new Error(err+"");
    }
  }
);
export const addFieldsToContentById = createAsyncThunk(
  "users/addFieldsToContentById",
  // if you type your function argument here
  async (contentData:IContentField, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://contentmanagementservice.onrender.com/ContentManagement/${contentData.contentId}`,
        contentData
      );
      if (response.status === 200) {
        return contentData;
      } else {
        return rejectWithValue(response.status);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const addContentModalData = createAsyncThunk(
  "users/addContentModalData",
  // if you type your function argument here
  async (contentModalData: IContentField, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://contentmanagementservice.onrender.com/ContentManagement/create",
        contentModalData
      );
      if (response.status === 201) {
        return contentModalData;
      } else {
        return rejectWithValue(response.status);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const userReducer = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContentData: (state, action: PayloadAction<IContentField>) => {
      state.contentData = [...state.contentData, action.payload];
    },
    addFieldsByContent: (
      state: IContentState,
      action: PayloadAction<IContentField>
    ) => {
      let index = state.contentData?.findIndex(
        (data: IContentField) => data.contentId === action.payload.contentId
      );
      index = state.contentData[0]?.contentId ? index : 0;
      if (index !== -1) {
        state.contentData[index].fields = [
          ...(state.contentData[index]?.fields ?? {}),
          ...action.payload.fields,
        ];
      }
      state.contentData = [...state.contentData];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContentModalData.pending, (state, action) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator
      })
      .addCase(addContentModalData.fulfilled, (state, action) => {
        state.contentData = [...state.contentData, action.payload];
      })
      .addCase(addContentModalData.rejected, (state, action) => {})
      .addCase(addFieldsToContentById.pending, (state, action) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator
      })
      .addCase(addFieldsToContentById.fulfilled, (state, action) => {
        let index = state.contentData?.findIndex(
          (data: IContentField) => data.contentId === action.payload.contentId
        );
        index = state.contentData[0]?.contentId ? index : 0;
        if (index !== -1) {
          state.contentData[index].fields = [
            ...action.payload.fields,
          ];
        }
        state.contentData = [...state.contentData];
      })
      .addCase(addFieldsToContentById.rejected, (state, action) => {})
      .addCase(fetchContentData.pending, (state, action) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        state.contentData = [...action.payload];
      })
      .addCase(fetchContentData.rejected, (state, action) => {})
  },
});

export const { addContentData, addFieldsByContent } = userReducer.actions;

// Other code such as selectors can use the imported `RootState` type
export default userReducer.reducer;
