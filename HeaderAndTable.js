export const WORKBENCH_TYPES = {
    FETCH_REQUEST: "FETCH_REQUEST",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
    UPDATE_DROPDOWN_SELECTION: "UPDATE_DROPDOWN_SELECTION",
  };

  
//   ##Actions

import { WORKBENCH_TYPES } from "./workbench.types";

// Fetch request action
export const fetchRequest = (card) => ({
  type: WORKBENCH_TYPES.FETCH_REQUEST,
  payload: { card },
});

// Fetch success action
export const fetchSuccess = (card, data) => ({
  type: WORKBENCH_TYPES.FETCH_SUCCESS,
  payload: { card, data },
});

// Fetch failure action
export const fetchFailure = (card, error) => ({
  type: WORKBENCH_TYPES.FETCH_FAILURE,
  payload: { card, error },
});

// Update dropdown selection
export const updateDropdownSelection = (name, value) => ({
  type: WORKBENCH_TYPES.UPDATE_DROPDOWN_SELECTION,
  payload: { name, value },
});

// Fetch data for a card
export const fetchCardData = (card, endpoint, params = {}) => async (dispatch) => {
  dispatch(fetchRequest(card));
  try {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${endpoint}?${queryParams}` : endpoint;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Failed to fetch ${card} data`);

    const data = await response.json();
    dispatch(fetchSuccess(card, data));
  } catch (error) {
    dispatch(fetchFailure(card, error.message));
  }
};

// Fetch dropdown data based on dependencies
export const fetchDropdownData = (name, params) => async (dispatch) => {
  dispatch(fetchRequest("card4"));
  try {
    const response = await fetch(`/api/card4/${name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error("Failed to fetch dropdown data");

    const data = await response.json();
    dispatch(fetchSuccess("card4", { [name]: { options: data } }));
  } catch (error) {
    dispatch(fetchFailure("card4", error.message));
  }
};


// reducer

import { WORKBENCH_TYPES } from "./workbench.types";

const initialState = {
  card1: { data: null, loading: false, error: null },
  card2: { data: null, loading: false, error: null },
  card3: { data: null, loading: false, error: null },
  card4: {
    data: null,
    loading: false,
    error: null,
    dropdowns: {
      datasets: { options: [], selected: null },
      containers: { options: [], selected: null },
      fileTypes: { options: [], selected: null },
      filePaths: { options: [], selected: null },
    },
  },
};

const workbenchReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKBENCH_TYPES.FETCH_REQUEST:
      return {
        ...state,
        [action.payload.card]: {
          ...state[action.payload.card],
          loading: true,
          error: null,
        },
      };

    case WORKBENCH_TYPES.FETCH_SUCCESS:
      if (action.payload.card === "card4") {
        return {
          ...state,
          card4: {
            ...state.card4,
            loading: false,
            data: action.payload.data,
            dropdowns: {
              ...state.card4.dropdowns,
              ...action.payload.data, // Update dropdown options dynamically
            },
          },
        };
      }
      return {
        ...state,
        [action.payload.card]: {
          ...state[action.payload.card],
          loading: false,
          data: action.payload.data,
        },
      };

    case WORKBENCH_TYPES.FETCH_FAILURE:
      return {
        ...state,
        [action.payload.card]: {
          ...state[action.payload.card],
          loading: false,
          error: action.payload.error,
        },
      };

    case WORKBENCH_TYPES.UPDATE_DROPDOWN_SELECTION:
      return {
        ...state,
        card4: {
          ...state.card4,
          dropdowns: {
            ...state.card4.dropdowns,
            [action.payload.name]: {
              ...state.card4.dropdowns[action.payload.name],
              selected: action.payload.value,
            },
          },
        },
      };

    default:
      return state;
  }
};

export default workbenchReducer;


