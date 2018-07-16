import axios from "axios";
import BastionApiData from "./BastionApiData";

const getBastionApiCount = () => {
  return axios
    .get("https://pokeapi.bastionbot.org/v1/pokemon/counts")
    .then(response => response.total)
    .catch(error => error);
};

const isValidProperty = (obj, prop) => {
  return obj.hasOwnProperty(prop) && obj[prop];
};

const getBastionApiNumber = data => {
  if (!data) return null;
  const info = data[0];

  if (isValidProperty(info, "number")) return info["number"];

  return null;
};

const getBastionApiName = data => {
  if (!data) return null;
  const info = data[0];

  if (isValidProperty(info, "name")) return info["name"];

  return null;
};

const getBastionApiImage = data => {
  if (!data) return null;
  const info = data[0];

  if (isValidProperty(info, "sprite")) return info["sprite"];

  return null;
};

const getBastionApiInfos = count => {
  const promises = [];
  for (let number = 1; number <= count; number++) {
    promises.push(
      axios.get(`https://pokeapi.bastionbot.org/v1/pokemon/${number}`)
    );
  }

  return axios.all(promises).then(response => {
    return response.map(response => {
      return {
        number: getBastionApiNumber(response.data),
        name: getBastionApiName(response.data),
        image: getBastionApiImage(response.data)
      };
    });
  });
};

const setBastionApiInfos = infos => {
  for (let info of infos) {
    BastionApiData.sync(
      { force: true }.then(() => {
        return BastionApiData.create({
          number: info.number,
          name: info.name,
          image: info.image
        });
      })
    );
  }
};

const loadBastionApiData = () => {
  getBastionApiCount()
    .then(getBastionApiInfos)
    .then(setBastionApiInfos);
};

export default loadBastionApiData;
