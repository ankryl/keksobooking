import './util.js';
import './form.js';
import { getDataFilter } from './fetch.js';
import { filterControlGroups, filterRules, selectFilter } from './filter.js'

const DEFAULT_VALUE = 'any';

const filterOffer = ({ offer }) =>
  filterControlGroups.every(
    ({ value, id }) => value === DEFAULT_VALUE || filterRules[id](offer, value));

getDataFilter(filterOffer);

const rerender = () => getDataFilter(filterOffer);

selectFilter.addEventListener('change', _.debounce(rerender, 500));
