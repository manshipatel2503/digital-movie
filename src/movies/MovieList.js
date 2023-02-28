import React, { useState } from 'react';
import './Movie.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IMAGE_URL } from '../constant';

const MovieList = (props) => {
    // Destructure props
    const { id, title, overview, original_title, poster_path, release_date, vote_average, favourite, showFav } = props;
    // Set up state for whether modal is shown or not
    const [show, setShow] = useState(false);

    // Function to call the changeFavourite function passed in through props
    const changeFavourite = (data) => {
        props.changeFavourite(data);
    }

    // Functions to handle showing and hiding the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col sm={4}>
                <div className="d-flex flex-column h-75" data-testid="movie-card">
                    <Card className='h-100'>
                        {/* Display movie poster image */}
                        <Card.Img variant="top" className='image' src={IMAGE_URL + poster_path} />

                        {showFav && (
                            <button type="button" className="btn btn-circle fav-btn">
                                {favourite ?
                                    // Show red favourite icon if already a favourite
                                    (<img onClick={() => changeFavourite({ type: 'remove', id: id })}
                                        alt="favourite icon" src={require("../assets/images/red-like.svg").default}
                                        className='fav-icon'
                                    />) :
                                    // Show grey favourite icon if not already a favourite
                                    (
                                        <img onClick={() => changeFavourite({ type: 'add', id: id, data: { title, original_title, overview, poster_path } })}
                                            alt="favourite icon" src={require("../assets/images/like.svg").default} width="10" height="10"
                                            className='fav-icon' />
                                    )
                                }
                            </button>
                        )}
                        <Card.Body>
                            {/* Display movie title */}
                            <Row>
                                <Card.Title>{title}</Card.Title>
                            </Row>
                            <div className='view-btn'>
                                <Button variant="outline-dark" onClick={handleShow}>View More</Button>

                            </div>
                            <Card.Text>
                                {/* Button to open modal */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </Col>

            {/* Modal to display more information about the movie */}
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {/* Display movie title in modal header */}
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display more movie information */}
                    <Container>
                        <Row>
                            <Col>
                                {/* Display movie poster in modal */}
                                <img className="card-img-top" style={{ width: '14rem' }} src={IMAGE_URL + poster_path} />
                            </Col>
                            <Col>
                                <h4>IMDb: {vote_average}</h4>
                                <p>Release Date: {release_date}</p>
                                <h6>Overview</h6>
                                <p>{overview}</p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    {/* Button to close modal */}
                    <Button variant="outline-dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default MovieList;