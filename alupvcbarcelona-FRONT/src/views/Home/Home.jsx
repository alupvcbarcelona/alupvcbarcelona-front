import React from 'react'
import { home_content, home_description } from './utils/content'
import './Home.css'

const Img = React.lazy(() => import('../../components/Img/Img'))
const Content = React.lazy(() => import('../../components/Content/Content'))

const Home = () => {
  const content = home_content
  const description = home_description

  return (
    <section className='home__content fadeIn'>
      <div>
        <Content element={content} />
      </div>
      <div className='home__section'>
        {description?.body.map((item, index) => (
          <div key={`section-${index}`} className='home__use'>
            <div>
              <h2>{item?.title}</h2>
              {item.article.map((article, articleIndex) => (
                <article key={`article-${articleIndex}`}>
                  <p>{article.paragraph}</p>
                  {article.description_ && (
                    <div className='home__bussiness-type'>
                      {article.description_.map((desc, descIndex) => (
                        <div key={`desc-${descIndex}`}>
                          <h3>{desc.title}</h3>
                          {desc.ul && (
                            <ul>
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
                    <ol>
                      {article.ol.map((li, olIndex) => (
                        <li key={`ol-li-${olIndex}`}>{li.li}</li>
                      ))}
                    </ol>
                  )}
                </article>
              ))}
            </div>
            <div>
              <Img icon={item.img.img} alt={item.img.alt} w={item.img.width} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Home
