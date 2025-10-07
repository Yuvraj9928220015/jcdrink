import './BlogPost.css';
import Contact from '../Contact/Contact';

export default function BlogPost() {
    return (
        <>
            <div className="about">
                {/* Main Content */}
                <div id='Blog-container-Section' className="container">
                    <section className="blog-section">
                        <div className="section-header">
                            <h2 className="section-heading">Latest Blog</h2>
                            <p className="section-description">
                                Stay updated with our latest insights, trends, and stories from the world of innovation.
                            </p>
                        </div>

                        {/* Hidden Wonders Section */}
                        <div className="hidden-wonders-section">
                            <div className="row">
                                <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                                    <div className="wonders-content">
                                        <h2 className="wonders-title">
                                            Discover the World's <span className="highlight">Hidden</span> Wonders
                                        </h2>
                                        <p className="wonders-description">
                                            Find the unique, memorable and hidden gems that
                                            make your destination extraordinary. From ancient
                                            temples to modern marvels, explore destinations
                                            that will leave you breathless.
                                        </p>
                                        <button className="wonders-btn">
                                            Explore Now
                                            <i className="fa fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                                    <div className="wonders-images">
                                        <div className="main-image">
                                            <img src="https://i.pinimg.com/736x/ef/39/d1/ef39d1ce5361fa0d4f978c765ce98360.jpg" alt="Hidden Wonder 1" />
                                        </div>
                                        <div className="side-images">
                                            <div className="side-image">
                                                <img src="https://i.pinimg.com/736x/ec/82/1c/ec821c579cd0072606556764166e73a9.jpg" alt="Hidden Wonder 2" />
                                            </div>
                                            <div className="side-image">
                                                <img src="https://i.pinimg.com/736x/24/6d/c7/246dc7a3e8702f0caa31a034b677dad9.jpg" alt="Hidden Wonder 3" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="blog-grid">
                            {/* 1 */}
                            <article className="blog-card" data-aos="fade-up">
                                <div className="blog-image-wrapper">
                                    <img src="https://i.pinimg.com/736x/ef/39/d1/ef39d1ce5361fa0d4f978c765ce98360.jpg" alt="Blog post" />
                                    <div className="blog-date">
                                        <span className="date-day">15</span>
                                        <span className="date-month">Jan</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">Innovation in Modern Design</h3>
                                    <p className="blog-excerpt">
                                        Exploring the latest trends in design and how they're shaping the future of user experience.
                                        Discover innovative approaches that are revolutionizing the industry.
                                    </p>
                                    <button className="blog-read-more">
                                        Read More
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>

                            {/* 2 */}
                            <article className="blog-card" data-aos="fade-up">
                                <div className="blog-image-wrapper">
                                    <img src="https://i.pinimg.com/736x/ec/82/1c/ec821c579cd0072606556764166e73a9.jpg" alt="Blog post" />
                                    <div className="blog-date">
                                        <span className="date-day">15</span>
                                        <span className="date-month">Jan</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">Innovation in Modern Design</h3>
                                    <p className="blog-excerpt">
                                        Exploring the latest trends in design and how they're shaping the future of user experience.
                                        Discover innovative approaches that are revolutionizing the industry.
                                    </p>
                                    <button className="blog-read-more">
                                        Read More
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>

                            {/* 3 */}
                            <article className="blog-card" data-aos="fade-up">
                                <div className="blog-image-wrapper">
                                    <img src="https://i.pinimg.com/736x/24/6d/c7/246dc7a3e8702f0caa31a034b677dad9.jpg" alt="Blog post" />
                                    <div className="blog-date">
                                        <span className="date-day">15</span>
                                        <span className="date-month">Jan</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">Innovation in Modern Design</h3>
                                    <p className="blog-excerpt">
                                        Exploring the latest trends in design and how they're shaping the future of user experience.
                                        Discover innovative approaches that are revolutionizing the industry.
                                    </p>
                                    <button className="blog-read-more">
                                        Read More
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>

                            {/* 4 */}
                            <article className="blog-card" data-aos="fade-up">
                                <div className="blog-image-wrapper">
                                    <img src="https://i.pinimg.com/736x/ef/39/d1/ef39d1ce5361fa0d4f978c765ce98360.jpg" alt="Blog post" />
                                    <div className="blog-date">
                                        <span className="date-day">15</span>
                                        <span className="date-month">Jan</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">Innovation in Modern Design</h3>
                                    <p className="blog-excerpt">
                                        Exploring the latest trends in design and how they're shaping the future of user experience.
                                        Discover innovative approaches that are revolutionizing the industry.
                                    </p>
                                    <button className="blog-read-more">
                                        Read More
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>

                            {/* 5 */}
                            <article className="blog-card" data-aos="fade-up">
                                <div className="blog-image-wrapper">
                                    <img src="https://i.pinimg.com/736x/ec/82/1c/ec821c579cd0072606556764166e73a9.jpg" alt="Blog post" />
                                    <div className="blog-date">
                                        <span className="date-day">15</span>
                                        <span className="date-month">Jan</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">Innovation in Modern Design</h3>
                                    <p className="blog-excerpt">
                                        Exploring the latest trends in design and how they're shaping the future of user experience.
                                        Discover innovative approaches that are revolutionizing the industry.
                                    </p>
                                    <button className="blog-read-more">
                                        Read More
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>

                            {/* 6 */}
                            <article className="blog-card" data-aos="fade-up">
                                <div className="blog-image-wrapper">
                                    <img src="https://i.pinimg.com/736x/24/6d/c7/246dc7a3e8702f0caa31a034b677dad9.jpg" alt="Blog post" />
                                    <div className="blog-date">
                                        <span className="date-day">15</span>
                                        <span className="date-month">Jan</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-title">Innovation in Modern Design</h3>
                                    <p className="blog-excerpt">
                                        Exploring the latest trends in design and how they're shaping the future of user experience.
                                        Discover innovative approaches that are revolutionizing the industry.
                                    </p>
                                    <button className="blog-read-more">
                                        Read More
                                        <i className="fa fa-arrow-right"></i>
                                    </button>
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* Stats Section */}

                </div>
            </div>
            <Contact />
        </>
    );
}