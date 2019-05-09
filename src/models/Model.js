import axios from "axios";

class Model {
  /**
   * @param {String} url
   */
  static findByUrl(url) {
    return axios.get("https://saveoffline.com/process/", {
      params: {
        type: "json",
        url: url
      }
    });
  }
}

export default Model;
