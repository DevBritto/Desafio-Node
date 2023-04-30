
const { request } = require('express')
const express = require('express')
const uuid = require('uuid')
const app = express()
const port = process.env.PORT || 3001
const  cors = require('cors')
app.use(express.json())
app.use(cors())
app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})


const orders = []

app.get("/", (req, res) => {
   return res.json("hello world");
});

const checkUserId = ( request, response, next ) => {
    const { id } = request.params

    const index = orders.findIndex(pedidos => pedidos.id === id)

    if(index < 0) {
        return response.status(404).json({message: "pedido inexistente"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

const methods = ( request, response, next ) => {
    const method = request.route.methods
    const url = request.route.path

    console.log(method, url)

next()
}    

app.get('/orders', methods,(request, response) => {
   // const { pedido, clientName, price, status } = request.body
    return response.json(orders)

})

app.post('/orders', methods, (request, response) => {
    const { pedido, clientName, price, status } = request.body

    const order = { id:uuid.v4(), pedido, clientName, price, status }

    orders.push(order)

    return response.status(201).json(orders)
})   

app.put('/orders/:id', checkUserId, methods, (request, response) => {
    //const { id } = request.params
    const { pedido, clientName, price, status } = request.body
    const index = request.userIndex
    const  id = request.userId

    const orderUpdated = { id, pedido, clientName, price, status }

    //const index = orders.findIndex(pedidos => pedidos.id === id)

    //if(index < 0){
       // return response.status(404).json({message: "pedido inexistente"})
    //}

    orders[index] = orderUpdated

    return response.json(orderUpdated)
})   


app.delete('/orders/:id', checkUserId, methods, (request, response) => {
    //const { id } = request.params
    const index = request.userIndex

    //const index = orders.findIndex(pedidos => pedidos.id === id)

    //if(index < 0){
        //return response.status(404).json({message: "pedido inexistente"})
    //}

    orders.splice(index,1)

    return response.status(204).json(orders)
})

app.patch('/orders/:id', checkUserId, methods,(request, response) => {
    //const { id } = request.params
    const { pedido, clientName, price, status } = request.body
    const  id = request.userId
    const index = request.userIndex

    const orderUpdated = { id, pedido, clientName, price, status }

    //const index = orders.findIndex(pedidos => pedidos.id === id)

    //if(index < 0){
        //return response.status(404).json({message: "pedido inexistente"})
    //}

    orders[index] = orderUpdated

    return response.json(orderUpdated)

})    