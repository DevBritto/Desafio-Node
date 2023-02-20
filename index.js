
const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())
app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})

const orders = []

app.get('/orders',(request, response) => {
   // const { pedido, clientName, price, status } = request.body
    return response.json(orders)

})

app.post('/orders', (request, response) => {
    const { pedido, clientName, price, status } = request.body

    const order = { id:uuid.v4(), pedido, clientName, price, status }

    orders.push(order)

    return response.status(201).json(orders)
})   

app.put('/orders/:id', (request, response) => {
    const { id } = request.params
    const { pedido, clientName, price, status } = request.body

    const orderUpdated = { id, pedido, clientName, price, status }

    const index = orders.findIndex(pedidos => pedidos.id === id)

    if(index < 0){
        return response.status(404).json({message: "pedido inexistente"})
    }

    orders[index] = orderUpdated

    return response.json(orderUpdated)
})   


app.delete('/orders/:id',(request, response) => {
    const { id } = request.params

    const index = orders.findIndex(pedidos => pedidos.id === id)

    if(index < 0){
        return response.status(404).json({message: "pedido inexistente"})
    }

    orders.splice(index,1)

    return response.status(204).json(orders)
})

app.patch('/orders/:id',(request, response) => {
    const { id } = request.params
    const { pedido, clientName, price, status } = request.body

    const orderUpdated = { id, pedido, clientName, price, status }

    const index = orders.findIndex(pedidos => pedidos.id === id)

    if(index < 0){
        return response.status(404).json({message: "pedido inexistente"})
    }

    orders[index] = orderUpdated

    return response.json(orderUpdated)

})    