import { useStateValue } from "../StateProvider";
import { baseUrl } from "../../../global/config";
import axios from "axios";




const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
};

export function AddPacel(item){
      const [{ user }, dispatch] = useStateValue();
      console.log(`send via actions`);
    axios
    .post(baseUrl + "/api/v1/parcel", item, config)
  };