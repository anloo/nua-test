import getApiClient, { HttpError } from '../api';
const client = getApiClient({baseURL: '/api/v1/'});

export const FETCH_PAGE_REQUEST = 'FETCH_PAGE_REQUEST';
export const FETCH_PAGE_SUCCESS = 'FETCH_PAGE_SUCCESS';
export const FETCH_PAGE_FAILURE = 'FETCH_PAGE_FAILURE';

export const fetchPageRequest = slug => ({
  type: FETCH_PAGE_REQUEST, slug
});

export const fetchPageSuccess = (slug, page) => ({
  type: FETCH_PAGE_SUCCESS, slug, page
});

export const fetchPageFailure = slug => ({
  type: FETCH_PAGE_FAILURE, slug
});

export const fetchPage = slug => dispatch =>  {
  dispatch(fetchPageRequest(slug));

  return client.get(`/articles/${slug}/`)
    .then(
      response => {
        dispatch(fetchPageSuccess(slug, response.data));
      },
      error => {
        if (error instanceof HttpError && error.status == HttpError.NOT_FOUND) {
          return dispatch(fetchPageFailure(slug));
        }
        return Promise.reject(error);
      }
  );
}

export const loadPage = slug => (dispatch, getState) => {
  if (getState().pages[slug] == null) {
    return dispatch(fetchPage(slug));
  }
};


export const FETCH_TAXA_REQUEST = 'FETCH_TAXA_REQUEST';
export const FETCH_TAXA_SUCCESS = 'FETCH_TAXA_SUCCESS';
export const FETCH_TAXA_FAILURE = 'FETCH_TAXA_FAILURE';

export const fetchTaxaRequest = query => ({
  type: FETCH_TAXA_REQUEST, query
});

export const fetchTaxaSuccess = (taxa) => ({
  type: FETCH_TAXA_SUCCESS, taxa
});

export const fetchTaxaFailure = () => ({
  type: FETCH_TAXA_FAILURE
});

export const fetchTaxa = query => dispatch =>  {
  dispatch(fetchTaxaRequest(query));

  return client.get('/findTaxaByFilter/')
    .then(
      response => {
        dispatch(fetchTaxaSuccess(response.data.taxa));
      },
      error => {
        return Promise.reject(error);
      }
  );
};


export const FETCH_TAXON_REQUEST = 'FETCH_TAXON_REQUEST';
export const FETCH_TAXON_SUCCESS = 'FETCH_TAXON_SUCCESS';
export const FETCH_TAXON_FAILURE = 'FETCH_TAXON_FAILURE';

export const fetchTaxonRequest = aphiaId => ({
  type: FETCH_TAXON_REQUEST, aphiaId
});

export const fetchTaxonSuccess = taxon => ({
  type: FETCH_TAXON_SUCCESS, taxon
});

export const fetchTaxonFailure = aphiaId => ({
  type: FETCH_TAXON_FAILURE, aphiaId
});

export const fetchTaxon = aphiaId => dispatch =>  {
  dispatch(fetchTaxonRequest(aphiaId));

  return client.get(`/taxa/${aphiaId}/`)
    .then(
      response => {
        dispatch(fetchTaxonSuccess(response.data));
      },
      error => {
        return Promise.reject(error);
      }
  );
};

export const loadTaxon = aphiaId => (dispatch, getState) => {
  if (getState().taxa[aphiaId] == null) {
    return dispatch(fetchTaxon(aphiaId));
  }
};
