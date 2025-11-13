import "./Contact.css";

function Contact() {
    return (
        <div className="contact-section">
            <div className="contact-section-container">
                <div className="contact-content">
                    <div className="contact-grid">
                        
                        <div data-aos="fade-right" className="contact-form-section">
                            <h2 className="form-title">Leave a Message</h2>
                            <p className="form-subtitle">
                                We'll get back to you within one business day.
                            </p>

                            <form className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <input type="text" placeholder="First Name" className="form-input" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Last Name" className="form-input" required />
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <input type="email" placeholder="Email Address" className="form-input" required />
                                </div>

                                <div className="form-group full-width">
                                    <textarea placeholder="Your Message" className="form-textarea" required></textarea>
                                </div>

                                <button type="submit" className="submit-btn">
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;