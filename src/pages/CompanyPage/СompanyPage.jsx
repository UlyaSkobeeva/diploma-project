import { useEffect, useState } from 'react'
import './CompanyPage.css' //стили для кнопки

export default function Company() {
  return (
    <>
      <section className="home">
        <div className="containerPage">
          <div className="homeContent">
            <h1 className="homeHeading">Рады приветствовать Вас в команде</h1>
            <div className="homeText">
              <p>
                С нами у вас будет возможность обрести ценный опыт работы,
                развить свои профессиональные навыки и добиться значительного
                карьерного роста.
              </p>
            </div>
          </div>
        </div>
        <div className="homeBgImg">
          <img
            src="https://static.wixstatic.com/media/04ba0b2450a4460bad90b90bc9908adf.jpg/v1/fill/w_1032,h_688,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/04ba0b2450a4460bad90b90bc9908adf.jpg"
            alt="Background cover"
          />
        </div>
      </section>

      <section className="story">
        <div className=" container-wide">
          <div className="story-row">
            <div className="story-content">
              <h2 className="story-heading">В чем заключается наша работа</h2>
              <div className="story-text">
                <p>
                  Мы занимаемся внедрением и сопровождением программных
                  продуктов фирмы «1С», адаптируем программы под деятельность
                  заказчика и проводим консультирование пользователей по
                  вопросам использования типового программного продукта.
                </p>
              </div>
            </div>

            <div className="story-video">
              <img
                className="story-img"
                src="https://inform-ua.info/uploads/2018/09/05c9c1865bb67823dec7f2d9de6e94bf-1535991281.jpg"
                type="video/mp4"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container-page">
          <div className="how-it-works-header">
            <div className="how-it-works-header-head">
              <h2 className="how-it-works-title"></h2>
              <h3 className="how-it-works-subtitle">
                3 шага к достижению карьерного роста
              </h3>
            </div>
          </div>

          <div className="how-it-works-steps">
            <div className="step">
              <h4 className="step-heading" data-number="01">
                постоянное саморазвитие
              </h4>

              <div className="step-text">
                <p>
                  Выделяйте время для изучения новых материалов, посещения
                  образовательных мероприятий и применения полученных знаний на
                  практике.
                </p>
              </div>

              <div className="step-img-wrapper">
                <img
                  className="step-img"
                  src="https://www.isabeldprice.com/wp-content/uploads/2023/01/whitelist-instructions-scaled.jpg"
                  alt="Step Img"
                />
              </div>
            </div>

            <div className="step">
              <h4 className="step-heading" data-number="02">
                {' '}
                выход за пределы своей зоны комфорта
              </h4>

              <div className="step-text">
                <p>
                  Беритесь за проекты, которые кажутся сложными или незнакомыми,
                  ставьте перед собой амбициозные задачи и продвигайте себя
                  вперед.
                </p>
              </div>

              <div className="step-img-wrapper">
                <img
                  className="step-img"
                  src="https://avatars.mds.yandex.net/get-ydo/9710801/2a000001892103d6bcdba4fe8da9f256250b/diploma"
                  alt="Step Img"
                />
              </div>
            </div>

            <div className="step step3">
              <h4 className="step-heading" data-number="03">
                эффективное управление временем
              </h4>

              <div className="step-text">
                <p>
                  Для достижения профессиональных целей важно определить
                  приоритеты и разработать план действий, который поможет
                  использовать время наиболее продуктивно.
                </p>
              </div>

              <div className="step-img-wrapper">
                <img
                  className="step-img"
                  src="https://avatars.dzeninfra.ru/get-zen_doc/10095435/pub_6505da9fb2e63c7f41396f5e_6505db71dcd2a47a731234b2/scale_1200"
                  alt="Step Img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
