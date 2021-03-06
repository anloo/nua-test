import { combineReducers } from 'redux';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
  FETCH_TAXA_REQUEST,
  FETCH_TAXA_SUCCESS,
  FETCH_TAXA_FAILURE,
  FETCH_TAXON_REQUEST,
  FETCH_TAXON_SUCCESS,
  FETCH_TAXON_FAILURE
} from '../actions';


const pages = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        [action.slug]: null
      };
    case FETCH_PAGE_SUCCESS:
      return {
        ...state,
        [action.slug]: {
          title: action.page.title,
          body: action.page.content
        }
      };
    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        [action.slug]: false
      };
    default:
      return state;
  }
};

const taxa = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TAXA_SUCCESS:
      const additionalTaxa = {};
      for (const taxon of action.taxa) {
        if (state[taxon.scientific_name] == null) {
          additionalTaxa[taxon.scientific_name] = {
            scientificName: taxon.scientific_name,
            authority: taxon.authority,
            rank: taxon.rank,
            parentName: taxon.parentName,
            thumbnail: `/media/small/${taxon.image}.jpg`
          }
        }
      }
      return { ...state, ...additionalTaxa };
    case FETCH_TAXON_SUCCESS:
      return {
        ...state,
        [action.taxon.scientific_name]: {
          scientificName: action.taxon.scientific_name,
          authority: action.taxon.authority,
          rank: action.taxon.rank,
          parentName: action.taxon.parentName,
          thumbnail: `/media/small/${action.taxon.image}.jpg`
        }
      };
    default:
      return state;
  }
};

const queries = (state = {taxa: {}}, action) => {
  const query = '*';

  switch (action.type) {
    case FETCH_TAXA_REQUEST:
      return {
        ...state,
        taxa: {
          ...state.taxa,
          [query]: []
        }
      };
    case FETCH_TAXA_SUCCESS:
      return {
        ...state,
        taxa: {
          ...state.taxa,
          [query]: action.taxa.map(taxon => taxon.scientific_name)
        }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  pages,
  taxa,
  queries
});

export default rootReducer;
