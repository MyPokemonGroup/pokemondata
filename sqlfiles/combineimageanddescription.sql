CREATE TABLE pokemon(
  pokemon_id INT not null,
  name varchar(50) not null,
  image varchar(250),
  description varchar(500)
);

INSERT INTO pokemon
  SELECT   images.number AS pokemon_id,
           NAME,
           image,
           description
  FROM      images
  LEFT JOIN pokeapidata
  ON        images.number = pokeapidata.number;
