import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const ListView = ({openModal}) => {
  const state = useSelector((store) => store.flight);
// sayfa basına düşen eleman sayısısı
  const itemsPerPage = 10; 
  
  // gösterilecek ilk elemanın dizideki sırası
  const [itemOffset, setItemOffset] = useState(0);
  //gösterilecek sonuncu elemanın dizideki yeri
  const endOffset = itemOffset + itemsPerPage;
  // belirlenen aralıkta elemanları secme
  const currentItems = state.flight.slice(itemOffset, endOffset);
 // toplam sayfa sayısını bulma
  const pageCount = Math.ceil(state.flight.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % state.flight.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="my-4">
      <div>
        <table className="w-full table-fixed text-white bg-gray-800">
          <thead>
            <tr>
              <th className="p-2">id</th>
              <th className="p-2">Kuyruk Kodu</th>
              <th className="p-2">Enlem</th>
              <th className="p-2">Boylam</th>
              <th className="p-2">Detay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {currentItems.map((flight) => (
              <tr key={flight.id} className="hover:bg-gray-700">
                <td className="p-2 text-center">{flight.id}</td>
                <td className="p-2 text-center">{flight.code}</td>
                <td className="p-2 text-center">{flight.lat}</td>
                <td className="p-2 text-center">{flight.lng}</td>
                <td className="p-2 text-center">
                  <button 
                  onClick={()=>openModal(flight.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded">
                    Detay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          className="text-white flex items-center justify-center gap-3 "
          breakLabel="..."
          nextLabel="İleri >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Geri"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default ListView;
