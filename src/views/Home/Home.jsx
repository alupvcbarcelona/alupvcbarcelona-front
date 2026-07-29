import React from "react";
import { home_content, home_description } from "./utils/content";
import {
  handleCallPhone,
  handleEmail,
  handleWhatsapp,
} from "../../components/Footer/utils";
const Img = React.lazy(() => import("../../components/Img/Img"));
const Content = React.lazy(() => import("../../components/Content/Content"));
const PhotoGallery = React.lazy(
  () => import("../../components/PhotoGallery/PhotoGallery"),
);

import ViewFeedback from "../../components/Feedback/ViewFeedback";
import Button from "../../components/Button/Button";
import "./Home.css";
import ws from "/whatsapp.svg";

const Home = () => {
  const content = home_content;
  const description = home_description;

  return (
    <section className="home__content fadeIn">
      <div>
        <Content element={content} />
        <div className="btn-actions">
          <Button
            p="5px"
            br="5px"
            children="Contactanos"
            onClick={handleEmail}
          />
          <Button
            p="5px"
            br="5px"
            children="Llamanos"
            onClick={handleCallPhone}
          />
        </div>
      </div>
      <div className="home__section">
        {description?.body.map((item, index) => (
          <div key={`section-${index}`} className="home__use">
            <div>
              <h2>{item?.title}</h2>
              {item.article.map((article, articleIndex) => (
                <article key={`article-${articleIndex}`}>
                  <p>{article.paragraph}</p>
                  {article.description_ && (
                    <div className="home__bussiness-type">
                      {article.description_.map((desc, descIndex) => (
                        <div key={`desc-${descIndex}`}>
                          <h3>{desc.title}</h3>
                          {desc.ul && (
                            <ul className="home__list">
                              {desc.ul.map((li, liIndex) => (
                                <li key={`desc-li-${liIndex}`}>{li.li}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {article.ol && (
                    <ol className="home__list">
                      {article.ol.map((li, olIndex) => (
                        <li key={`ol-li-${olIndex}`}>{li.li}</li>
                      ))}
                    </ol>
                  )}
                </article>
              ))}
              {item.btn && (
                <div className="btn-actions">
                  <Button
                    p="5px"
                    br="5px"
                    children="Contactanos"
                    onClick={handleEmail}
                  />
                  <Button
                    p="5px"
                    br="5px"
                    children="Llamanos"
                    onClick={handleCallPhone}
                  />
                </div>
              )}
            </div>
            <div>
              <Img
                icon={item.img.img}
                br="20px"
                alt={item.img.alt}
                w={item.img.width}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="photo-gallery__container">
        <h4>Galería de Fotos</h4>
        <PhotoGallery />
      </div>
      <div className="feedback__container">
        <ViewFeedback />
      </div>
      <div className="float-ws-btn">
        <Button
          p="5px"
          br="50%"
          w="60px"
          icon={ws}
          bgColor="var(--p-bg-tertiary_green)"
          onClick={handleWhatsapp}
        />
      </div>
    </section>
  );
};

export default Home;
