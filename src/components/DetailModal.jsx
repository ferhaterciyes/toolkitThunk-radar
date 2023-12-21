import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../constants/constants";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { setPath } from "../app/slices/flightSlice";

const DetailModal = ({ detailID, closeModal }) => {
  const [d, setDetail] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setDetail(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailID}`,
        options,
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [detailID]);

  return (
    <div className="fixed flex items-center h-screen z-[1000] left-0 top-0 max-md:w-screen">
      <div className="bg-black md:mt-40  p-2 z-50 text-white ml-3 max-md:ml-0 max-md:rounded-none max-md:w-full h-[75%] max-md:h-screen flex-col  rounded-xl box">
        <p className="w-full text-[18px] bg-blue-500 flex justify-end p-1 max-md:p-4 rounded-lg font-extrabold ">
          <span className="cursor-pointer mr-3" onClick={() => closeModal()}>
            {" "}
            X
          </span>
        </p>
        <div className="flex h-full items-center justify-center font-bold text-xl flex-col gap-6">
          {!d ? (
            <Loader />
          ) : !d.airport.destination || !d.airport.origin ? (
            <p className="text-center text-red-700">
              Bu uçuşun verileri gizlidir..
            </p>
          ) : (
            <>
              <h2>{d.aircraft.model.text}</h2>
              <h2>{d.aircraft.model.code}</h2>
              <p>
                <span>Kuyruk Kodu : </span>
                <span>{d.aircraft.registration}</span>
              </p>
              <img
                className="w-[200px] rounded-xl max-md:w-full max-md:p-3"
                src={d.aircraft.images.large[0].src}
                alt="plane picture"
              />

              <p>
                <span>Şirket : </span>
                <span>{d.airline.short}</span>
              </p>

              <p>
                <span>Kalkış : </span>
                <a target="_blank" href={d.airport.origin.website}>
                  {d.airport.origin.name.slice(0, 18)}
                </a>
              </p>
              <p>
                <span>Hedef : </span>
                <a target="_blank" href={d.airport.destination.website}>
                  {d.airport.destination.name.slice(0, 18)}
                </a>
              </p>
              <p className={`status ${d.status.icon}`}>{d.status.text}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
