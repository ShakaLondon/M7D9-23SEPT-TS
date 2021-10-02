import { Container, Row, Col, ListGroup } from "react-bootstrap"

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


const DishComments = ({ id, comments }:Dishes) => (
    <Container>
        <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
                <ListGroup>
                    {
                        id ? comments?.map(c => (
                            <ListGroup.Item key={c.id}>{c.comment}</ListGroup.Item>
                        )) : <p>Click on a dish to read its comments</p>
                    }
                </ListGroup>
            </Col>
        </Row>
    </Container>
)

export default DishComments