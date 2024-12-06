import Carousel from 'react-bootstrap/Carousel';
import '../style.scss';

const Carouseles = () => {
    return (
        <Carousel data-bs-theme="dark" className='container mt-4 d-lg-block d-none'>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="1.jpg"
                    alt="First slide"
                    height="350px"
                    style={{ borderRadius: '6px' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="2.jpg"
                    alt="Second slide"
                    height="350px"
                    style={{ borderRadius: '6px' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="3.webp"
                    alt="Third slide"
                    height="350px"
                    style={{ borderRadius: '6px' }}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Carouseles;