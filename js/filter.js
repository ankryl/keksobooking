const selectFilter = document.querySelector(".map__filters");

const housingPrice = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: Infinity,
  },
};

const filterControlGroups = Array.from(selectFilter.children);

const filterRules = {
  "housing-type": ({ type }, value) => value === type,
  "housing-price": ({ price }, value) =>
    price >= housingPrice[value].from && price < housingPrice[value].to,
  "housing-rooms": ({ rooms }, value) => value === rooms.toString(),
  "housing-guests": ({ guests }, value) => value === guests.toString(),
  "housing-features": ({ features }) => {
    if (!features) {
      return false;
    }
    const checkedCheckboxes = Array.from(
      selectFilter.querySelectorAll('[type="checkbox"]:checked')
    );
    return checkedCheckboxes.every(({ value }) =>
      features.some((feature) => feature === value)
    );
  },
};

export {filterControlGroups, filterRules, selectFilter}

