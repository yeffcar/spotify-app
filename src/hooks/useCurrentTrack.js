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
        setCurrentTrack(null); // Reset current track state on error
      }
    };

    // Función para obtener el track actual y configurar el intervalo de actualización
    const fetchAndSetCurrentTrack = () => {
      fetchCurrentTrack();
      const interval = setInterval(fetchCurrentTrack, 10000); // Actualiza cada 10 segundos (ajusta según tus necesidades)
      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
    };

    // Inicia la obtención del track actual y el intervalo al montar el componente
    if (accessToken) {
      fetchAndSetCurrentTrack();
    }

    // Limpia el intervalo al desmontar el componente o cuando cambia accessToken
    return () => clearInterval(fetchAndSetCurrentTrack);
  }, [accessToken]);

  return currentTrack;
};

export default useCurrentTrack;
