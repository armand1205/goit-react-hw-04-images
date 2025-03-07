import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ query }) {
  const [images, setImages] = useState([]); // Starea pentru a stoca imaginile
  const [page, setPage] = useState(1); // Starea pentru a stoca numărul paginii curente
  const [isLoading, setIsLoading] = useState(false); // Starea pentru a indica dacă se încarcă datele
  const [error, setError] = useState(null); // Starea pentru a stoca mesajele de eroare

  // Funcția pentru a face cererea API și a obține imaginile
  const fetchImages = async (typedQuery, pageNum) => {
    const url = `https://pixabay.com/api/?key=49093767-f763ba3dd9ac650ddc614c870&q=${typedQuery}&page=${pageNum}&per_page=12&orientation=horizontal`;
    console.log(`Fetching images with URL: ${url}`); // Adaugă un console log pentru a verifica URL-ul
    setIsLoading(true); // Setează starea de încărcare la true
    try {
      const response = await axios.get(url);
      console.log('Response:', response); // Adaugă un console log pentru a verifica răspunsul
      const { data } = response;
      const { totalHits, hits } = data;
      if (totalHits === 0) {
        setError(
          'Nu a fost gasita nicio imagine care corespunde criteriului de cautare.'
        );
        setIsLoading(false);
        return;
      }
      setImages(prevImages => [...prevImages, ...hits]); // Adaugă imaginile noi la cele existente
    } catch (error) {
      console.error('Error fetching images:', error); // Adaugă un console log pentru a verifica eroarea
      setError('A aparut o eroare la cererea imaginilor de pe server.');
      setIsLoading(false);
    } finally {
      setIsLoading(false); // Setează starea de încărcare la false
    }
  };

  // useEffect pentru a face cererea API atunci când query se schimbă
  useEffect(() => {
    if (query) {
      setImages([]); // Resetează imaginile când query se schimbă
      setPage(1); // Resetează pagina la 1 când query se schimbă
      fetchImages(query, 1); // Face cererea API cu query și pagina 1
    }
  }, [query]);

  // useEffect pentru a face cererea API atunci când pagina se schimbă
  useEffect(() => {
    if (page > 1) {
      fetchImages(query, page); // Face cererea API cu query și pagina curentă
    }
  }, [query, page]);

  return (
    <div>
      {isLoading && <Loader />} {/* Afișează Loader dacă se încarcă datele */}
      {error && <p>{error}</p>} {/* Afișează mesajul de eroare dacă există */}
      <ul className={styles.gallery}>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={image.id}
            images={images}
            image={image}
            index={index}
          />
        ))}
      </ul>
      {images.length > 0 && !isLoading && (
        <button
          className={styles.loadMoreButton}
          onClick={() => {
            setIsLoading(true); // Setează starea de încărcare la true când se face clic pe buton
            setPage(prevPage => prevPage + 1);
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
