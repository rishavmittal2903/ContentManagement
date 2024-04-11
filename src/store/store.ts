import { configureStore } from '@reduxjs/toolkit'
import ContentReducer from './reducer/ContentReducer'
// ...
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({content: ContentReducer})

export const store = configureStore({
  reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch