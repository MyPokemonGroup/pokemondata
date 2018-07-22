import axios from "axios";
import BastionApiData from "./BastionApiData";

// Get the total Pokemon count in Bastion API (use very infrequently)
const getBastionApiCount = () => {
  return axios
    .get("https://pokeapi.bastionbot.org/v1/pokemon/counts")
    .then(response => response.total)
    .catch(error => error);
};

// Helper function to check if `prop` is a valid property of `obj`
const isValidProperty = (obj, prop) => {
  return obj.hasOwnProperty(prop) && obj[prop];
};

// Pulls `number` value from returned Bastion info object
const getBastionApiNumber = data => {
  if (!data) return null;
  const info = data[0];

  if (isValidProperty(info, "number")) return info["number"];

  return null;
};

// Pulls `name` value from returned Bastion info object
const getBastionApiName = data => {
  if (!data) return null;
  const info = data[0];

  if (isValidProperty(info, "name")) return info["name"];

  return null;
};

// Pulls `image` value from returned Bastion info object
const getBastionApiImage = data => {
  if (!data) return null;
  const info = data[0];

  if (isValidProperty(info, "sprite")) return info["sprite"];

  return null;
};

// Make calls to Bastion API that starts from `start` and `end`, where
// `end` is the total number of Pokemon in the API (807 as of 07/2018)
const getBastionApiInfos = (start = 1, end = 807) => {
  const promises = [];
  for (let number = start; number <= end; number++) {
    promises.push(
      axios
        .get(`https://pokeapi.bastionbot.org/v1/pokemon/${number}`)
        .catch(error => error)
    );
  }

  return axios
    .all(promises)
    .then(response => {
      return response.map(response => {
        return {
          number: getBastionApiNumber(response.data),
          name: getBastionApiName(response.data),
          image: getBastionApiImage(response.data)
        };
      });
    })
    .catch(error => error);
};

// Sync version of set()
const setBastionApiInfosSync = infos => {
  for (let info of infos) {
    BastionApiData.sync({ force: true }).then(() => {
      return BastionApiData.create({
        number: info.number,
        name: info.name,
        image: info.image
      });
    });
  }
};

// Non-sync (table already created) version of set()
const setBastionApiInfos = infos => {
  for (let info of infos) {
    return BastionApiData.create({
      number: info.number,
      name: info.name,
      image: info.image
    });
  }
};

// Pass `sync` argument as true to use sync version of set()
export const loadBastionApiData = (start, end, sync = false) => {
  if (sync) {
    getBastionApiInfos(start, end).then(setBastionApiInfosSync);
  } else {
    getBastionApiInfos(start, end).then(setBastionApiInfos);
  }
};
