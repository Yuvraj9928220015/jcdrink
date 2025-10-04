import "./Blog.css";

function Blog() {
    return (
        <>
            <div className="Blog">
                <div className="container">
                        <section className="blog-section">
                    <div className="section-header">
                        <h2 className="section-heading">Latest Blog</h2>
                        <p className="section-description">
                            Stay updated with our latest insights, trends, and stories from the world of innovation.
                        </p>
                    </div>

                    <div className="blog-grid">
                        <article className="blog-card" data-aos="fade-up">
                            <div className="blog-image-wrapper">
                                <img src="/pex.jpg" alt="Blog post" />
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

                        <article className="blog-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="blog-image-wrapper">
                                <img src="./public/orange.jpg" alt="Blog post" />
                                <div className="blog-date">
                                    <span className="date-day">12</span>
                                    <span className="date-month">Jan</span>
                                </div>
                            </div>
                            <div className="blog-content">
                                <h3 className="blog-title">Technology Meets Creativity</h3>
                                <p className="blog-excerpt">
                                    How cutting-edge technology is empowering creative professionals to push boundaries
                                    and create experiences that were once impossible to achieve.
                                </p>
                                <button className="blog-read-more">
                                    Read More
                                    <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </article>

                        <article className="blog-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="blog-image-wrapper">
                                <img src="/pex-1.jpg" alt="Blog post" />
                                <div className="blog-date">
                                    <span className="date-day">08</span>
                                    <span className="date-month">Jan</span>
                                </div>
                            </div>
                            <div className="blog-content">
                                <h3 className="blog-title">Future of Digital Solutions</h3>
                                <p className="blog-excerpt">
                                    Looking ahead at emerging technologies and methodologies that will define the next
                                    generation of digital solutions and user interactions.
                                </p>
                                <button className="blog-read-more">
                                    Read More
                                    <i className="fa fa-arrow-right"></i>
                                </button>
                            </div>
                        </article>
                    </div>
                </section>
                </div>
            </div>
        </>
    );
}

export default Blog;