import { loadBastionApiData } from "./loadBastionApiData";

/*
Load via Bastion API, into DB
*/
function loadFromBastionApiIncrements(increment = 50, max = 807, sync = false) {
  if (increment < 50) increment = 50;
  if (max > 807 || max < 1) max = 807;

  for (let number = 1; number <= max; number += increment) {
    let start = number;
    let end = start + increment;
    loadBastionApiData(start, end, sync);
  }
}

// Call to load from Bastion API
loadFromBastionApiIncrements(50, 807, true);
