import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../src/app/css/globals.css'
import '../../src/app/css/form.css'


const AddAnime = ({ characterData, handleFormSubmit }) => {
  const [character, setCharacter] = useState(characterData || {
    id: null,
    name: "",
    power: "",
    agility: "",
    intelligence: "",
    attackType: "",
    picUrl: "",
    abilities: [{ name: "", id: null }],
  });

  useEffect(() => {
    if (characterData) {
      setCharacter(characterData);
    }
  }, [characterData]);

  const handleChange = (e, field, i, subField) => {
    const newCharacter = { ...character };
    if (Array.isArray(newCharacter[field])) {
      newCharacter[field] = newCharacter[field].map((item, index) => {
        if (index === i) {
          return { ...item, [subField]: e.target.value };
        } else {
          return item;
        }
      });
    } else {
      newCharacter[field] = e.target.value;
    }
    setCharacter(newCharacter);
  };

  const handleAdd = (field) => {
    const newCharacter = { ...character };
    newCharacter[field].push({ name: "", id: null });
    setCharacter(newCharacter);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (characterData) {
        // Обновление персонажа
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/characters/update?id=${character.id}`,
          character
        );
        alert("Successfully updated");
        console.log(response.data);
        handleFormSubmit();
      } else {
        // Создание персонажа
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/characters/create`,
          character
        );
        alert("Successfully added");
        console.log(response.data);
      }

      // Сброс формы
      setCharacter({
        id: null,
        name: "",
        power: "",
        agility: "",
        intelligence: "",
        attackType: "",
        picUrl: "",
        abilities: [{ name: "", id: null }],
      });
      //handleFormSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  
    return (
      <div>
        <form onSubmit={(event) => handleSubmit(event)} className="flex flex-col content">
          <h1 className="text-xl font-bold">
            {characterData ? "Update" : "Add"} character
          </h1>
          <input
            defaultValue={character.name}
            type="text"
            name="name"
            onChange={(e) => handleChange(e, "name")}
            placeholder="Name"
            required
          />
          <input
            defaultValue={character.power}
            type="number"
            min="0"
            name="power"
            onChange={(e) => handleChange(e, "power")}
            placeholder="Power"
            required
          />
          <input
            defaultValue={character.agility}
            type="number"
            min="0"
            name="agility"
            onChange={(e) => handleChange(e, "agility")}
            placeholder="Agility"
            required
          />
          <input
            defaultValue={character.intelligence}
            type="number"
            min="0"
            name="intelligence"
            onChange={(e) => handleChange(e, "intelligence")}
            placeholder="Intelligence"
            required
          />
          <select
            defaultValue={character.attackType}
            name="type"
            onChange={(e) => handleChange(e, "attackType")}
            required
          >
            <option value="">Выберите тип атаки</option>
            <option value="Melee">Melee</option>
            <option value="Ranged">Ranged</option>
          </select>
          <input
            defaultValue={character.picUrl}
            type="url"
            name="picUrl"
            onChange={(e) => handleChange(e, "picUrl")}
            placeholder="Picture URL"
            required
          />
          {character.abilities.map((ability, i) => (
            <div key={i}>
              <input
                type="text"
                value={ability.name}
                onChange={(e) => handleChange(e, "abilities", i, "name")}
                placeholder={`Ability ${i + 1}`}
                required
              />
              {i === character.abilities.length - 1 && (
                <button type="button" onClick={() => handleAdd("abilities")}>
                  Добавить способность
                </button>
              )}
            </div>
          ))}
          <button type="submit">
            {characterData ? "Update character" : "Add character"}
          </button>
        </form>
      </div>
    );
  };
  
  export default AddAnime;
