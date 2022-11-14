import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import decorationimg from '../image/h-2-b.png'

export default function Footer(){
    return(
        // <!-- Футер -->
    <div className="home-2-footer-area home-2-footer-bg ovr-h">
    <div className="container">
        <div className="row">
            {/* <!-- {{--<div className="col-lg-2">
                --}}{{--<a href="/" className="home-footer-logo">
                    <img className="report__logo-img" src="/its-client/img/airplane-bg.png" alt="">
                </a>--}}{{--
                <p>Надежный сервис для проверки задолженностей для выезда за границу без затруднений</p>
            </div>--}} --> */}
            <div className="col-lg-12">
                <div className="row">
                    <div className="col">
                        <h4>Меню</h4>
                        <ul>
                            <li><a className="nav-link active" href="#exchanger">Обменник</a></li>
                            <li><a className="nav-link" href="#tax">Налоги</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h4>Г. Москва</h4>
                        <p>Ул. Викторенко 16к1</p>
                    </div>
                    {/* <!-- {{--<div className="col-lg-4 col-md-6">
                        --}}{{--<h4>&nbsp;</h4>--}}{{--
                        <p>Расчетные операции при проведении платежей осуществляет НКО «Монета» (Лицензия Центрального Банка РФ № 3508-К, ИНН 1215192632)</p>
                    </div>--}}
                    {{--
                    <div className="col-lg-4 col-md-6">
                        <h4>London Office</h4>
                        <p>87 London Road Kingston Upon,KT44 1HY London, UK</p>
                    </div>
                    --}} --> */}
                </div>
            </div>
            {/* <!-- {{--<div className="col-lg-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 social-link">
                        <h4>Поддержка</h4>
                        <a href="#">WhatsApp</a>
                        <p><a href="tel:79691900724">+7 969 190‑07‑24</a></p>
                        <a href="mailto:support@aircheck.ru">support@aircheck.ru</a>
                        <p>24/7</p>
                    </div>
                </div>
            </div>--}} --> */}

            <img src={decorationimg} alt="" className="h-2-img decoration-img"/>
        </div>
    </div>
    <div className="copyright-area">
        <div className="container">
            <div className="row">
                <div className="col-2">
                    faas.ru
                </div>
                <div className="col-lg-10">
                    <div className="social-link">
                        <a href="#requisites"> Наши реквизиты</a>
                        <a href="#policy">Политика конфиденциальности</a>
                        <a href="#offer">Договор-оферта</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}