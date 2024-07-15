import { useEffect, useState } from 'react';

const useCurrentTrack = (accessToken) => {
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch current track');
        }

        const data = await response.json();
        setCurrentTrack(data.item);
      } catch (error) {
        console.error('Error fetching current track:', error);
        setCurrentTrack(null); 
      }
    };

    const fetchAndSetCurrentTrack = () => {
      fetchCurrentTrack();
      const interval = setInterval(fetchCurrentTrack, 10000); 
      return () => clearInterval(interval); 
    };


    if (accessToken) {
      fetchAndSetCurrentTrack();
    }

   
    return () => clearInterval(fetchAndSetCurrentTrack);
  }, [accessToken]);

  return currentTrack;
};

export default useCurrentTrack;
