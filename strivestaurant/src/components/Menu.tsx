import items from '../data/menu.json'
import { Badge, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

interface Comment {
    id: number,
    rating: number,
    comment: string,
    author: string,
    date: string
}

interface Comments extends Array<Comment>{}

interface Dishes {
    id: number,
    name: string,
    image: string,
    category: string,
    label: string,
    price: string,
    description: string,
    comments?: Comments
}

const Menu = (items: Dishes) => {

    const [data, setData] = useState<Dishes[]>([items])
    
    return (
    <Container>
        {data.map(dish => (
            <Row key={dish.id} className="text-center my-2">
                <Col md={{ span: 8, offset: 2 }}>
                    <img src={dish.image} alt="dish pic"></img>
                    <h4>
                        {dish.name}
                    </h4>
                    <p>
                        {dish.description}
                    </p>
                    <h4>
                        <Badge variant="warning">{dish.price}</Badge>
                    </h4>
                </Col>
            </Row>))}
    </Container>)
}

export default Menu