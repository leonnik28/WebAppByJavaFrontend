import '../src/app/css/globals.css'
import '../src/app/css/admin.css'
import Header from '@/app/Header'
import AddAnime from './admin/add'
import Tabs from '../src/app/tabs'
import PagesLayout from '../src/app/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

import del from '../public/delete.svg';
import edit from '../public/edit.svg';

const AdminPanel = () => {
    const [characterList, setCharacterList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [characterToEdit, setCharacterToEdit] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/characters`)
            .then(response => setCharacterList(response.data))
            .catch(error => console.error('Ошибка:', error));
    }, []);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = (event) => {
        //event.preventDefault();
        console.log('Форма отправлена');
        togglePopup();
    };

    const tabs = [
        { label: 'Characters list', content: <CharacterListPanel characterList={characterList} togglePopup={togglePopup} setCharacterToEdit={setCharacterToEdit} /> },
        { label: 'Add character', content: <AddAnime handleFormSubmit={handleSubmit}/>}
    ];

    return (
        <PagesLayout>
            <Header />
            {/* <div className='circle circle-1'></div> */}
            <div className='circle circle-2'></div>
            {/* <div className='circle circle-3'></div> */}
            <div className='circle circle-4'></div>
            <Tabs className='flex flex-col' tabs={tabs} />
            {isOpen && (
  <div className="popup">
    <div className="popup-inner">
      <button className="close-btn" onClick={togglePopup}>Close</button>
      <AddAnime handleFormSubmit={handleSubmit} characterData={characterToEdit}></AddAnime>
    </div>
  </div>
)}
        </PagesLayout>
    )
}

export default AdminPanel;

const CharacterListPanel = ({ characterList, togglePopup, setCharacterToEdit }) => {
    return (
        <div>
            <div className='flex flex-row justify-center space-x-20'>
                {/* <CreateCard cardTitle='Create anime' svgPath={add} altName="Create anime" panelName="/admin/add" /> */}
            </div>
            <span className='font-bold text-2xl'>All the character we have:</span>
            <div className='list pt-4'>
                {characterList.map(character => (
                    <div key={character.id} className='hover:-translate-y-1 transition ease-linear flex flex-row space-x-8 list-container'>
                        <span className='w-16 text-left'>Id: {character.id}</span>
                        <Link href={{
                            pathname: '/character',
                            query: { name: character.name }
                        }}>
                            <div className='w-96 text-left'>
                                <span>{character.name}</span>
                            </div>
                        </Link>
                        <EditButton togglePopup={() => {togglePopup(); setCharacterToEdit(character);}}/>
                        <DeleteButton characterId={character.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

const CreateCard = ({ cardTitle, svgPath, altName, panelName }) => {
    return (
        <Link href={panelName}>
            <div className="w-64 h-96 bg-neutral-800 hover:rotate-3 card hover:scale-105 transition ease-out">
                <Image src={svgPath} alt={altName} width={128} height={128} />
                <span className='caption'>{cardTitle}</span>
            </div>
        </Link>
    )
}

const EditButton = ({ togglePopup }) => {
    return (
        <button onClick={togglePopup}>
           <Image src={edit} alt='Update character' width={32} height={32} />
        </button>
    )
  }
  

const DeleteButton = ({ characterId }) => {
    const handleClick = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/characters/delete?id=${characterId}`);
            console.log(response.data);
        } catch (error) {
            console.error('There was a problem with the axios operation: ' + error.message);
        }
    };    
    return (
        <button onClick={handleClick}>
            <Image src={del} alt='Delete character' width={32} height={32} />
        </button>
    )
}

