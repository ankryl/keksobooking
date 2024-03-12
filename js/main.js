/* global _:readonly */
import './util.js';
import './create-objects.js';
import './form.js';
import { getDataFilter, getDataNoneFilter } from './fetch.js';
import { filterControlGroups, filterRules, selectFilter } from './filter.js'

const DEFAULT_VALUE = 'any';

const filterOffer = ({ offer }) =>
  filterControlGroups.every(
    ({ value, id }) => value === DEFAULT_VALUE || filterRules[id](offer, value));

getDataNoneFilter();

const rerender = () => getDataFilter(filterOffer);

selectFilter.addEventListener('change', _.debounce(rerender, 500));
