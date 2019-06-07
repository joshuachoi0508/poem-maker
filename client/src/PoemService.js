import axios from 'axios';

const url = 'http://localhost:5000/api/poems/'

class PoemService {
  //Get Poems
  static getPoems() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(poem => ({
            ...poem,
            createdAt: new Date(poem.createdAt)
          }))
        );
      } catch(err) {
        reject(err);
      }
    });
  }

  //Create Poems
  static insertPoem(text) {
    return axios.post(url, {
      text
    });
  }

  static editPoem(id, text) {
    return axios.put(`${url}${id}`, {
      text
    });
  }

  //Delete Poems
  static deletePoem(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default PoemService;