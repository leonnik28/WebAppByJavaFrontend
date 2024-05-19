import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../src/app/css/globals.css';
import Header from '@/app/Header';
import PagesLayout from '../src/app/layout';

const CharacterList = () => {
  const [characterList, setCharacterList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/characters`) // Используйте правильный порт
      .then((response) => {
        setCharacterList(response.data);
      })
      .catch((error) => {
        setError(error); // Обработка ошибки
      });
  }, []);

  if (error) {
    // Обработка ошибки
    return <div>Произошла ошибка: {error.message}</div>;
  }

  return (
    <PagesLayout>
      <Header />
      <div className='grid grid-cols-5 gap-4 m-10'>
        {characterList.map((character) => (
          <div key={character.id} className='w-60 hover:-translate-y-2 transition ease-linear'>
            <Link href={{
              pathname: '/character',
              query: { name: character.name }
            }}>
              <div>
                <img className='w-fit rounded-2xl' src={character.picUrl} alt={character.name} />
                <h2>{character.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </PagesLayout>
  );
};

export default CharacterList;
