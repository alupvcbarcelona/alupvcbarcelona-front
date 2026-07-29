import { Helmet, HelmetProvider } from "react-helmet-async";
import "./Content.css";

const Content = ({ element }) => {
  if (!element) return;
  const { body } = element;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{body.helmet.title}</title>
        <meta
          name={body.helmet.description.name}
          content={body.helmet.description.content}
        />
        <meta
          name={body.helmet.keywords.name}
          content={body.helmet.keywords.content}
        />
      </Helmet>
      <div className="content__container">
        <div className="content__content-information">
          {body.avatar && (
            <Img
              icon={body.avatar}
              alt={`icon ${body.title}`}
              w="40"
              title={`icon ${body.title}`}
            />
          )}
          <h1>{body.title}</h1>
        </div>
        <div className="content__content-contact">
          <p>{body.description}</p>
          <p>{body.description_}</p>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Content;
