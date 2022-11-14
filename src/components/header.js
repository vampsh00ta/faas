import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Header() {

    return(
        <div id="mainmenu-area">
        {/* <!-- Меню и логотипы --> */}
        <div className="header-area header-area-1 home-2-header-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-sm-10 w-50">
                        <div className="logo">
                        <div className="container mt-3">
                            <h4 className="text-white">
                            <div>FINANCE</div>
                            <div>AS</div>
                            <div>A</div>
                            <div>SERVICE</div>
                            </h4>
                        </div>
                            {/* <!-- {{--<a href="index.html">
                                <img src="./image/logo/footer_logo_blue.png" alt="" className="logo-1">
                                <img src="./image/logo/sticky_logo_blue.png" alt="" className="logo-2">
                            </a>--}} --> */}
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-4 w-50">
                        {/* <button id="menu-button">Меню</button>
                        <div className="mainmenu sm-hidden xs-hidden">
                            <ul>
                                <li><a className="nav-link" href="#exchanger">Обменник</a></li>
                                <li><a className="nav-link" href="#tax">Налоги</a></li>
                            </ul>
                        </div> */}
                        <Navbar expand="lg" bg="transparent" variant="dark">
                            <Container className='justify-content-end'>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav" className=''>
                                <Nav className="justify-content-end">
                                    <Nav.Link className='text-light text-center' href="#exchanger">Обменник</Nav.Link>
                                    <Nav.Link className='text-light text-center' href="#tax">Налоги</Nav.Link>
                                </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- /Меню и логотипы --> */}
    </div>
    )
}