import "./records.css";
import Close from "../../assets/images/close.svg";

const Records = ({ records, onClickClose, sortFunction }) => {
  return (
    <div className="records-wrapper">
      <img className="records-btn-close" src={Close} alt="close" title="Close records" onClick={onClickClose} />
      <h2 className="records-title">Your records</h2>
      <div className="table-container">
        {!records.length && <p className="records-warning">You have no records yet</p>}
        {!!records.length && 
          <table className="records-table">
            <thead>
              <tr><th>№</th><th>Name</th><th>Date</th><th>Bombs</th><th>Time</th></tr>  
            </thead>
            <tbody>
              {records.sort(sortFunction).filter((item, index) => index < 10).map((item, index) => {
                const sourceDate = new Date(item.date);
                const date = sourceDate.toLocaleString();
                return <tr key={index}><td>{index + 1}</td><td>{item.name}</td><td>{date}</td><td>{item.bombs}</td><td>{item.time}</td></tr>;
              })}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default Records;
