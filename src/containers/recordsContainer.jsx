import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideRecords, updateRecords } from "../actions/control";
import Records from "../components/records/records";
import fetchData from "../utils/fetchData";

const RecordsContainer = () => {
  const dispatch = useDispatch();
  const name = useSelector((rootState) => rootState.control.gamerName);
  const enableRecords = useSelector((rootState) => rootState.control.enableRecords);
  const needToUpdateRecords = useSelector((rootState) => rootState.control.needToUpdateRecords);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (needToUpdateRecords) {
      fetchData("GET", name)
        .then((response) => response.json())
        .then((data) => {
          setRecords(data);
          dispatch(updateRecords());
        })
        .catch((e) => console.log(e));
    }
  }, [needToUpdateRecords]);

  const onClickClose = useCallback(() => {
    dispatch(hideRecords());
  }, []);

  return (
    <>
      {enableRecords && (
        <Records
          records={records} 
          onClickClose={onClickClose}
        />
      )}
    </>
  );
};

export default RecordsContainer;
