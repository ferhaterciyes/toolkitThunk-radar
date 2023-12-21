// App.js

import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./app/flightActions/flightActions";
import DetailModal from "./components/DetailModal";

function App() {
  const dispatch = useDispatch();

  const [isView, setIsView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [d, setDetailId] = useState(null);

  const openModal = (id)=>{
    setIsModalOpen(true)
    setDetailId(id)   
  }

  const closeModal = ()=> {
    setIsModalOpen(false)
    setDetailId(null)
  }

  useEffect(() => {

    dispatch(getFlights());
 
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center text-black font-bold ">
        <button
          style={{ borderRadius: "6px 0 0 6px" }}
          className={`button ${isView ? "active" : ""} bg-white`}
          onClick={() => setIsView(true)}
        >
          Harita Görünümü
        </button>
        <button
          style={{ borderRadius: "0 6px 6px 0" }}
          className={`button ${!isView ? "active" : ""} bg-white`}
          onClick={() => setIsView(false)}
        >
          Liste Görünümü
        </button>
      </div>
      {isView ? <MapView openModal = {openModal} /> : <ListView openModal={openModal}/>}

      {isModalOpen && <DetailModal closeModal={closeModal} detailID = {d} />}
    </div>
  );
}

export default App;
