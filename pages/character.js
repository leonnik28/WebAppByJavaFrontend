import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import axios from 'axios';
import '../src/app/css/globals.css'
import Header from '@/app/Header';
import PagesLayout from "../src/app/layout";
import Image from 'next/image'
import loading from "../public/loading.svg"

const CharacterInfo = () => {
  const [characterData, setCharacterData] = useState(null);
  const [closestCharacters, setClosestCharacters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const { name } = router.query;
    if (name) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters/name?name=${name}`)
        .then(response => {
          const character = response.data[0];
          setCharacterData(character);

          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters/closest?name=${name}`)
            .then(closestResponse => {
              setClosestCharacters(closestResponse.data);
            });
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  }, [router.query.name]);

  return (
    <div>
        <CharacterInfoContent characterData={characterData} closestCharacters={closestCharacters} />
    </div>
  );
};

export default CharacterInfo;

const CharacterInfoContent = ({ characterData, closestCharacters }) => {
  if (!characterData) {
    return null;
  }

  const videoSource = characterData.urlVideo ? (
    <source src={characterData.urlVideo} type="video/webm" />
  ) : null;

  return (
    <PagesLayout>
      <Header />
      <div className="relative min-h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 right-5 w-[256px] h-[256px] object-cover"
        >
          {videoSource}
          <img
            src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/pudge.png"
            alt="Background"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </video>
        <div className="absolute left-0 w-full h-7 object-cover object-center z-[-2] -top-40">
          {/* <Image className="blur opacity-40" src={bg} /> */}
        </div>
        <div className="relative z-0">
          <div className="m-10 flex flex-row">
            <div className="z-[-1]">
              <div className="absolute top-0 left-40 w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-yellow-500 to-green-500 blur-3xl"></div>
              <div className="absolute top-80 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400 to-green-500 scale blur-3xl"></div>
            </div>
            <img
              src={characterData.picUrl}
              className="h-96 w-96 scale-105"
              alt={characterData.name}
            />
            <div className="flex flex-col pl-20">
              <h1 className="text-5xl font-extrabold">{characterData.name}</h1>
              <div className="mt-12">
                <div className="font-light">
                  <h2 className="font-bold  text-xl">Information:</h2>
                  <p>Name: {characterData.name}</p>
                  <p>Power: {characterData.power}</p>
                  <p>Agility: {characterData.agility}</p>
                  <p>Intelligence: {characterData.intelligence}</p>
                  <p>AttackType: {characterData.attackType}</p>
                  <p>Abilities:</p>
                  <div className="flex space-x-2">
                    {characterData.abilities.map((ability, index) => (
                      <React.Fragment key={ability.name}>
                        <Link
                          className="hover:underline"
                          href={{
                            pathname: '/abilities',
                            query: { abilities: ability.name },
                          }}
                        >
                          <img src={ability.picUrl} alt={ability.name} />
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                  <h2 className="absolute left-20 font-bold  text-xl">Other Characters:</h2>
                  <div className="absolute left-20 flex space-x-2 mt-8">
                    {closestCharacters.slice(0, 2).map((closestCharacter) => (
                      <Link key={closestCharacter.id} href={`/character?name=${closestCharacter.name}`}>
                          <img
                            src={closestCharacter.picUrl}
                            alt={closestCharacter.name}
                            className="h-36 w-64 scale-105"
                          />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

const LoadingStatus = () => {
  return (
    <div className="flex relative min-h-screen place-content-center items-center">
      <Image className="animate-spin mr-3" src={loading} alt='loading' width={48} height={48} />
      <p className="font-bold text-4xl">Загрузка...</p>
    </div>
  )
}
