<template>
  <div class="container">
    <h1>Fridge items: </h1>
    <div class="create-fridgeitem">
      <input v-model="naziv" type="text" class="form-control rounded-0" id="create-fridgeitem" placeholder="Input item"><br/>
      <input type="text" class="form-control rounded-0" v-model="kolicina" placeholder="Input quantity"><br/>
      <button v-on:click="createItem">Add to fridge!</button>
    </div>
    <hr>
    <p class="error" v-if="error"> {{error}}</p>
    <div class="fridgeitems-container">
      <div class= "collection-item"
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item._id"
        >
   <table>
    <tr>
      <th>Naziv: </th>
      <th>Kolicina:</th>
      <th>Datum kupovine:</th>
      <th>Brisanje</th>
  </tr>
  <tr>
    <td>{{item.naziv}}</td>
    <td>{{item.kolicina}}</td>
    <td>{{`${item.kupljeno.getDate()}/${item.kupljeno.getMonth()}/${item.kupljeno.getFullYear()}`}}</td>
    <button v-on:click="deleteItem(item._id)">Delete!</button>
  </tr>
  </table>
  </div>
  </div>
  </div>
</template>

<script>

import ItemService from '../ItemService';

export default {
  name: 'Item',
  data() {
    return {
      items: [],
      error: '',
      kolicina: '',
      naziv: ''
    }
  },
  async created(){
    try{
      this.items = await ItemService.getItems();
    }catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createItem(){
      await ItemService.insertItem(this.naziv,this.kolicina);
      this.items = await ItemService.getItems();
    },
    async deleteItem(id){
      await ItemService.deleteItem(id);
      this.items = await ItemService.getItems();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input[type=text] {
  width: 20%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 12px;
}
button{
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  background-color:green;
  font-size: 20px;
  color: whitesmoke;
  border-radius: 12px;
}
.title-display {
  padding: 20px;
  text-align: left;
  background:gray;
  color: white;
  font-size: 30px;
}
table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #ddd;
  padding: 8px;
}

table tr:nth-child(even){background-color: #f2f2f2;}

table tr:hover {background-color: #ddd;}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
  width: 25%;
}

</style>
