// src/components/admin/LocationPickerMap.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, Loader2, LocateFixed } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LocationPickerMapProps {
  latitude: string;
  longitude: string;
  locationName: string;
  onChange: (lat: string, lng: string, name?: string) => void;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function LocationPickerMap({ latitude, longitude, locationName, onChange }: LocationPickerMapProps) {
  const defaultLat = latitude ? parseFloat(latitude) : -6.2088; // fallback: Jakarta
  const defaultLng = longitude ? parseFloat(longitude) : 106.8456;

  const [position, setPosition] = useState<[number, number]>([defaultLat, defaultLng]);
  const [query, setQuery] = useState(locationName || '');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Input manual lat/lng — string terpisah agar bebas diketik tanpa dipaksa jadi angka tiap keystroke
  const [latInput, setLatInput] = useState(latitude || defaultLat.toFixed(6));
  const [lngInput, setLngInput] = useState(longitude || defaultLng.toFixed(6));
  const [coordError, setCoordError] = useState('');

  // Sinkron input manual saat posisi berubah dari peta/search (klik, drag, pilih hasil pencarian)
  useEffect(() => {
    setLatInput(position[0].toFixed(6));
    setLngInput(position[1].toFixed(6));
  }, [position]);

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      );
      const data = await res.json();
      return data.display_name as string | undefined;
    } catch {
      return undefined;
    }
  };

  const handlePick = useCallback(async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onChange(lat.toFixed(6), lng.toFixed(6));
    const name = await reverseGeocode(lat, lng);
    if (name) {
      setQuery(name);
      onChange(lat.toFixed(6), lng.toFixed(6), name);
    }
  }, [onChange]);

  // Search lokasi berdasarkan nama (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.length < 3) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
        );
        const data: NominatimResult[] = await res.json();
        setResults(data);
        setShowResults(true);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelectResult = (r: NominatimResult) => {
    const lat = parseFloat(r.lat);
    const lng = parseFloat(r.lon);
    setPosition([lat, lng]);
    setQuery(r.display_name);
    setShowResults(false);
    onChange(lat.toFixed(6), lng.toFixed(6), r.display_name);
  };

  // Terapkan koordinat yang diketik manual di kolom lat/lng
  const applyManualCoords = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (isNaN(lat) || isNaN(lng)) {
      setCoordError('Latitude/Longitude harus berupa angka.');
      return;
    }
    if (lat < -90 || lat > 90) {
      setCoordError('Latitude harus di antara -90 sampai 90.');
      return;
    }
    if (lng < -180 || lng > 180) {
      setCoordError('Longitude harus di antara -180 sampai 180.');
      return;
    }

    setCoordError('');
    setPosition([lat, lng]);
    onChange(lat.toFixed(6), lng.toFixed(6));
  };

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder="Cari nama kota / negara... (contoh: Tokyo, Japan)"
          className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
        />
        {searching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400" size={16} />
        )}

        {showResults && results.length > 0 && (
          <div className="absolute z-[1000] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
            {results.map(r => (
              <button
                type="button"
                key={r.place_id}
                onMouseDown={() => handleSelectResult(r)}
                className="w-full text-left px-4 py-2.5 text-xs hover:bg-indigo-50 border-b border-gray-50 last:border-0 flex items-start gap-2"
              >
                <MapPin size={14} className="shrink-0 mt-0.5 text-indigo-500" />
                <span className="line-clamp-2 text-gray-700">{r.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-gray-200 h-64 relative">
        <MapContainer center={position} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const { lat, lng } = marker.getLatLng();
                handlePick(lat, lng);
              },
            }}
          />
          <ClickHandler onPick={handlePick} />
          <RecenterMap lat={position[0]} lng={position[1]} />
        </MapContainer>
      </div>

      {/* Input Manual Latitude / Longitude */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-gray-500 mb-1">Latitude</label>
          <input
            type="text"
            inputMode="decimal"
            value={latInput}
            onChange={e => setLatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyManualCoords()}
            placeholder="-6.208800"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-gray-500 mb-1">Longitude</label>
          <input
            type="text"
            inputMode="decimal"
            value={lngInput}
            onChange={e => setLngInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyManualCoords()}
            placeholder="106.845600"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none"
          />
        </div>
      </div>

      {coordError && (
        <p className="text-xs text-red-500 font-medium">{coordError}</p>
      )}

      <button
        type="button"
        onClick={applyManualCoords}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 text-xs font-semibold hover:bg-indigo-100 transition-colors"
      >
        <LocateFixed size={14} />
        Terapkan Koordinat ke Peta
      </button>

      <p className="text-[11px] text-gray-400">
        💡 Klik/geser marker di peta, cari nama lokasi, atau ketik koordinat manual lalu tekan Enter / tombol di atas untuk memindahkan marker.
      </p>
    </div>
  );
}