import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import '../src/app/css/globals.css'
import Header from '@/app/Header';
import PagesLayout from '../src/app/layout';

const AbilitiesList = () => {
    const [character, setCharacter] = useState(null);
    const [ability, setAbility] = useState(null);
    const router = useRouter();
    const { query } = router;
    const abilitieName = query.abilities || '';
  
    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/abilities/name/character?name=${abilitieName}`)
        .then(response => {
          setCharacter(response.data);
        })
        .catch(error => console.error('Ошибка:', error));
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/abilities/name?name=${abilitieName}`)
        .then(response2 => {
            setAbility(response2.data);
          })
          .catch(error => console.error('Ошибка:', error));
    }, [abilitieName]);
  
    return (
      <PagesLayout>
        <Header />
        <h1 className='text-3xl font-extrabold m-10'>Ability: {abilitieName}</h1>
        {character && (
          <div className='grid grid-cols-5 gap-4 m-10'>
            <img className='w-fit rounded-2xl' src={ability.picUrl} alt={ability.name} />
            <div className='w-60 hover:-translate-y-2 transition ease-linear'>
              <Link href={`/character?name=${encodeURIComponent(character.name)}`}>
                <div>
                  <h2>{character.name}</h2>
                </div>
              </Link>
              <div>
                <h2>{ability.description}</h2>
              </div>
            </div>
          </div>
        )}
      </PagesLayout>
    );
  };

export default AbilitiesList;
