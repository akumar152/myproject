// types
export const FETCH_CONTAINERS_REQUEST = 'FETCH_CONTAINERS_REQUEST';
export const FETCH_CONTAINERS_SUCCESS = 'FETCH_CONTAINERS_SUCCESS';
export const FETCH_CONTAINERS_FAILURE = 'FETCH_CONTAINERS_FAILURE';

export const FETCH_FOLDER_PATHS_REQUEST = 'FETCH_FOLDER_PATHS_REQUEST';
export const FETCH_FOLDER_PATHS_SUCCESS = 'FETCH_FOLDER_PATHS_SUCCESS';
export const FETCH_FOLDER_PATHS_FAILURE = 'FETCH_FOLDER_PATHS_FAILURE';

// actions

import axios from 'axios';
import {
  FETCH_CONTAINERS_REQUEST,
  FETCH_CONTAINERS_SUCCESS,
  FETCH_CONTAINERS_FAILURE,
  FETCH_FOLDER_PATHS_REQUEST,
  FETCH_FOLDER_PATHS_SUCCESS,
  FETCH_FOLDER_PATHS_FAILURE,
} from './container.types';

// Fetch Containers
export const fetchContainers = () => async (dispatch) => {
  dispatch({ type: FETCH_CONTAINERS_REQUEST });
  try {
    const response = await axios.get('/api/containers'); // Replace with your API endpoint
    dispatch({ type: FETCH_CONTAINERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CONTAINERS_FAILURE, payload: error.message });
  }
};

// Fetch Folder Paths
export const fetchFolderPaths = (containerName) => async (dispatch) => {
  dispatch({ type: FETCH_FOLDER_PATHS_REQUEST });
  try {
    const response = await axios.get(`/api/folder-paths?container=${containerName}`); // Replace with your API endpoint
    dispatch({ type: FETCH_FOLDER_PATHS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FOLDER_PATHS_FAILURE, payload: error.message });
  }
};

// reducer

import {
    FETCH_CONTAINERS_REQUEST,
    FETCH_CONTAINERS_SUCCESS,
    FETCH_CONTAINERS_FAILURE,
    FETCH_FOLDER_PATHS_REQUEST,
    FETCH_FOLDER_PATHS_SUCCESS,
    FETCH_FOLDER_PATHS_FAILURE,
  } from './container.types';
  
  const initialState = {
    containers: [],
    folderPaths: [],
    loadingContainers: false,
    loadingFolderPaths: false,
    error: null,
  };
  
  const containerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CONTAINERS_REQUEST:
        return { ...state, loadingContainers: true };
      case FETCH_CONTAINERS_SUCCESS:
        return { ...state, loadingContainers: false, containers: action.payload };
      case FETCH_CONTAINERS_FAILURE:
        return { ...state, loadingContainers: false, error: action.payload };
  
      case FETCH_FOLDER_PATHS_REQUEST:
        return { ...state, loadingFolderPaths: true };
      case FETCH_FOLDER_PATHS_SUCCESS:
        return { ...state, loadingFolderPaths: false, folderPaths: action.payload };
      case FETCH_FOLDER_PATHS_FAILURE:
        return { ...state, loadingFolderPaths: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default containerReducer;
  
