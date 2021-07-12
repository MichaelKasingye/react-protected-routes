import { baseUrl } from "../global/config";
import axios from "axios";

const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
};

