import axios from 'axios';

const fetchImage = async (typedQuery, pageNum) => {
  const url = `https://pixabay.com/api/?key=49093767-f763ba3dd9ac650ddc614c870&q=${typedQuery}&page=${pageNum}&per_page=12&orientation=horizontal`; // Notiflix.Loading.dots();
  try {
    const response = await axios.get(url);
    const { data } = response;
    const { totalHits, hits } = data;
    if (totalHits === 0) {
      return <p>Sorry, no images found. Try something else</p>;
    }
    return { totalHits, hits };
  } catch (error) {
    console.error(error);
  } finally {
  }
};

export default fetchImage;
