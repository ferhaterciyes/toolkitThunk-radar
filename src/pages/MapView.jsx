import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { clearPath } from "../app/slices/flightSlice";
import { icon } from "leaflet";
const MapView = ({ openModal }) => {
  const state = useSelector((store) => store.flight);
  const dispatch = useDispatch();
  const planeIcon = icon({
    iconUrl: "/plane-i.png",
    iconSize: [25, 25],
  });
  return (
    <MapContainer
      center={[38.765914, 35.437304]}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {state.flight.map((flight) => (
        <Marker
          key={flight.id}
          icon={planeIcon}
          position={[flight.lat, flight.lng]}
        >
          <Popup>
            <div className="flex flex-col gap-2 font-bold text-center">
              <span className="text-lg font-semibold">Flight Details</span>
              <span>
                <strong>Kod:</strong> {flight.code}
              </span>
              <button
                onClick={() => openModal(flight.id)}
                className="bg-blue-500 p-3 rounded-2xl text-white hover:bg-blue-700 transition-all duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => dispatch(clearPath())}
                className="bg-red-500 p-3 rounded-2xl text-white hover:bg-red-700 transition-all duration-300"
              >
                Clear Route
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      {state.path.length > 0 && <Polyline positions={state.path} />}
    </MapContainer>
  );
};

export default MapView;
