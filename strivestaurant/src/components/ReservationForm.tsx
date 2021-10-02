import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

interface Reservation {
    name: string,
    phone: string,
    numberOfPersons: number,
    smoking: boolean,
    dateTime: string,
    specialRequests: string
    _id?: number
}

const ReservationForm = (reservation: Reservation) => {
    const [reservations, setReservation] = useState<Reservation>({
        name: '',
        phone: '',
        numberOfPersons: 1,
        smoking: false,
        dateTime: '',
        specialRequests: ''
})

    const inputChange = (value: string | boolean | number, stateProperty: string, checked?: boolean) => {

        setReservation({
            ...reservations,
            [stateProperty]: stateProperty === 'smoking' ? checked : value
        })
    }

    useEffect(() => {
    }, [reservation])

    const submitReservation = async (e: FormEvent) => {
        e.preventDefault()

        try {
            let response = await fetch("https://striveschool.herokuapp.com/api/reservation", {
                method: 'POST',
                body: JSON.stringify(reservations),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (response.ok) {
                alert('Reservation saved!')
                setReservation({
                    name: '',
                    phone: '',
                    numberOfPersons: 1,
                    smoking: false,
                    dateTime: '',
                    specialRequests: ''
                })
            } else {
                alert('Houston we had a problem, try again!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h3 className="mt-3">RESERVATION FORM</h3>
            <Form className="mb-5" onSubmit={(e) => submitReservation(e)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={reservations.name}
                        id="name"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e.target.value, e.target.id)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter phone"
                        id="phone"
                        value={reservations.phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e.target.value, e.target.id)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>How many people?</Form.Label>
                    <Form.Control
                        as="select"
                        value={reservations.numberOfPersons}
                        id="numberOfPersons"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e.target.value, e.target.id)}
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        type="checkbox"
                        label="Do you smoke?"
                        checked={reservations.smoking}
                        id="smoking"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e.target.value, e.target.id, e.target.checked)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={reservations.dateTime}
                        id="dateTime"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e.target.value, e.target.id)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Any special request?</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={reservations.specialRequests}
                        id="specialRequests"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => inputChange(e.target.value, e.target.id)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default ReservationForm