import React from 'react'

const UserCart = React.createContext({
    usercart: [],
    orders: 0,
    addItem: ()=>{}
})

export default UserCart