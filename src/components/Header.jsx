import { useSelector } from "react-redux";

const Header = () => {

  const state = useSelector(store=>store.flight)
  return (
    <header className="flex justify-between items-center text-white p-5 font-serif">
      <div className="flex items-center gap-5">
        <img className="w-[80px]" src="..//plane-l.png" />
        <h1 className=" font-bold text-3xl">Uçuş Radarı</h1>
      </div>
      <div className="grid place-items-center">
        <span className="text-xl ">{state.isLoading ? "Uçuşlar Heaplanıyor..": state.isError ?"Uçuşlar alınırken hata oluştu!": `${state.flight.length} Uçuş bulundu..` }</span>
      </div>
    </header>
  );
};

export default Header;
