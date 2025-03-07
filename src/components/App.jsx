import React, { useState } from 'react'; // Importă React și useState pentru gestionarea stării
import Searchbar from './Searchbar/Searchbar'; // Importă componenta Searchbar
import ImageGallery from './ImageGallery/ImageGallery'; // Importă componenta ImageGallery

export const App = () => {
  const [query, setQuery] = useState(''); // Definește starea query pentru a stoca termenul de căutare

  // Funcția handleSearchSubmit este apelată atunci când formularul de căutare este trimis
  const handleSearchSubmit = event => {
    event.preventDefault(); // Previne comportamentul implicit al formularului (reîncărcarea paginii)
    const form = event.currentTarget; // Obține referința la formularul care a declanșat evenimentul
    const searchQuery = form.elements.search.value.trim(); // Obține valoarea introdusă în câmpul de căutare și elimină spațiile albe de la început și sfârșit
    if (searchQuery && searchQuery !== query) {
      // Verifică dacă valoarea introdusă nu este goală și este diferită de termenul de căutare curent
      setQuery(searchQuery); // Actualizează starea query cu noul termen de căutare
    }
  };

  return (
    <div
      style={{
        display: 'grid', // Setează afișarea ca grid
        gridTemplateColumns: '1fr', // Definește o coloană în grid
        gap: '16px', // Setează spațiul dintre elementele grid-ului
        paddingBottom: '24px', // Setează padding-ul de jos
      }}
    >
      <Searchbar onSubmit={handleSearchSubmit} />{' '}
      {/* Afișează componenta Searchbar și îi transmite funcția handleSearchSubmit ca proprietate */}
      <ImageGallery query={query} />{' '}
      {/* Afișează componenta ImageGallery și îi transmite termenul de căutare query ca proprietate */}
    </div>
  );
};
