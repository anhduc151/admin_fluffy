import "../Pagnigation/index.css";
import { Pagination } from "antd";

function Pagnigation({ meta, setParams }) {
  return (
    <div className="pagnigation_all">
      <Pagination
        className="pagnigation"
        pageSize={meta?.itemsPerPage || 10}
        current={meta?.currentPage || 1}
        total={meta?.totalItems || 10}
        onChange={(e) => {
          setParams((params) => ({ ...params, page: e }));
        }}
      />
    </div>
  );
}

export default Pagnigation;
