import React from 'react'

const itemData = React.createContext({itemlist: [{
    name:'Lettuce',
    price:55,
    img:"./assets/lettuce.jpg"
},
{
    name:'Tomato',
    price:25,
    img:"./assets/tomato.jpg"
},
{
    name:'Cabbage',
    price:35,
    img:".../assets/cbg.jpg"
},
{
    name:'Carrots',
    price:40,
    img:"../../../assets/carrot.jpg"
},
{
    name:'Onions',
    price:80,
    img:"../../../assets/carrot.jpg"
},
{
    name:'Chilli Peppers',
    price:70,
    img:"../../../assets/carrot.jpg"
},
{
    name:'Apples',
    price:60,
    img:"../../../assets/carrot.jpg"
},
{
    name:'Bananas',
    price:45,
    img:"../../../assets/carrot.jpg"
}]});

export default itemData;