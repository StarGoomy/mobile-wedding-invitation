
// src/components/Map.tsx
import { useEffect, useRef } from 'react';
import data from 'data.json';

declare global {
  interface Window {
    naver: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const clientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;
  const { lat, lon } = data.mapInfo;

  useEffect(() => {
    
    if (!clientId) {
      console.error("NAVER client ID 없음");
      return;
    }

    // 스크립트 중복 방지
    const existingScript = document.querySelector('script[src*="maps.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
      script.async = true;
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapRef.current || !window.naver?.maps) return;

      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lon),
        zoom: 17,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lon),
        map,
      });
    }
  }, []); // ✅ 의존성 제거: 절대 한 번만 실행되도록

  return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};

export default Map;




/*
// src/components/Map.tsx
import { useEffect, useRef, useState } from 'react';
import data from 'data.json';

declare global {
  interface Window {
    naver: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const clientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;
  const { lat, lon } = data.mapInfo;
  // 1. 네이버 지도 script 불러오기
  useEffect(() => {
    if (!clientId) {
      console.error("NAVER client ID 없음");
      return;
    }

    if (document.querySelector(`script[src*="maps.js"]`)) {
      setIsScriptLoaded(true); // 이미 로드된 경우
      return;
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => console.error("네이버 지도 스크립트 로딩 실패");

    document.head.appendChild(script);
  }, [clientId]);

  // 2. 지도 초기화
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || !window.naver?.maps) return;
    console.log("📌 지도 초기화 시작");

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(lat, lon),
      zoom: 17,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lon),
      map,
    });
  }, [isScriptLoaded, lat, lon]);

  return <div ref={mapRef} style={{ width: "100%", height: "300px" }} />;
};

export default Map;\
*/

/*
import data from 'data.json';
import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';

const Map = () => {
  const { lat, lon } = data.mapInfo;
  const navermaps = useNavermaps();

  return (
    <MapDiv
      style={{
        width: '100%',
        height: '300px',
      }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(lat, lon)}
        defaultZoom={17}
        draggable={false}
        pinchZoom={false}
        scrollWheel={false}
        keyboardShortcuts={false}>
        <Marker defaultPosition={new navermaps.LatLng(lat, lon)} />
      </NaverMap>
    </MapDiv>
  );
};

export default Map;
*/