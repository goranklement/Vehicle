const Paginator = ({ page, setPage }) => {
  const firstPage = () => {
    setPage(1);
  };
  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const nextPage = () => {
    setPage(page + 1);
  };
  return (
    <div className="paginator">
      <i
        onClick={firstPage}
        className="pi pi-angle-double-left"
        style={{ fontSize: "2rem" }}
      ></i>
      <i
        onClick={previousPage}
        className="pi pi-angle-left"
        style={{ fontSize: "2rem" }}
      ></i>
      <h6>{page}</h6>
      <i
        onClick={nextPage}
        className="pi pi-angle-right"
        style={{ fontSize: "2rem" }}
      ></i>
      <i className="pi pi-angle-double-right" style={{ fontSize: "2rem" }}></i>
    </div>
  );
};
export default Paginator;
