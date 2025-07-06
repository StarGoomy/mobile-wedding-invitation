import { useEffect, useRef } from 'react';

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      console.error('네이버 Client ID가 없습니다.');
      return;
    }

    // 이미 스크립트가 있으면 추가하지 않음
    const existingScript = document.querySelector(`script[src*="maps.js"]`);
    if (existingScript) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    function initMap() {
      if (!mapRef.current || !window.naver?.maps) return;

      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울시청
        zoom: 15,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5665, 126.9780),
        map,
      });
    }
  }, [clientId]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;
