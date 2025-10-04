import React, { useState } from 'react';
import './CheckoutForm.css';

export default function CheckoutForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        zip: '',
        country: '',
        city: '',
        state: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ message: '', type: '' });

        try {
            const response = await fetch('http://localhost:5000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            setStatus({ message: 'Thank you! Your order has been placed.', type: 'success' });
            setFormData({
                fullName: '',
                businessName: '',
                email: '',
                phone: '',
                zip: '',
                country: '',
                city: '',
                state: '',
                message: ''
            });

        } catch (error) {
            setStatus({ message: error.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-form-container">
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Checkout Information</h2>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fullName">Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Your Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="businessName">Business name</label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            placeholder="Your Business Name"
                            value={formData.businessName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone No.</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+91-1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* -- Form Row: ZIP and Country -- */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="zip">ZIP Code</label>
                        <input
                            type="text"
                            id="zip"
                            name="zip"
                            placeholder="e.g. 110001"
                            value={formData.zip}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="e.g. India"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* -- Form Row: City and State -- */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="e.g. New Delhi"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="e.g. Delhi"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group full-width">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Any additional information..."
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-group full-width">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>

                {status.message && (
                    <div className={`status-message ${status.type}`}>
                        {status.message}
                    </div>
                )}

            </form>
        </div>
    );
}