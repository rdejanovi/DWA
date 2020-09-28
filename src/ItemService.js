import axios from 'axios';

const url = 'api/items/';

class ItemService {
    //GET

    static getItems() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(data.map(item => ({
                    ...item,
                    kupljeno: new Date(item.kupljeno)
                })));
            } catch(err){
                reject(err);
            }
        });
    }

    //CREATE
    static insertItem(naziv,kolicina) {
        return axios.post(url, {
            naziv: naziv,
            kolicina: kolicina
        });
    }

    //EDIT
    static editItem(naziv,kolicina) {
        return axios.update(url, {
            naziv: naziv,
            kolicina: kolicina
        });
    }

    //DELETE
    static deleteItem(id) {
        return axios.delete (`${url}${id}`);
    }
}

export default ItemService;