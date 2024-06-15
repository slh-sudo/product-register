import React, { useState } from 'react';
import './App.css';

function ProductRegistration() {
    const [product, setProduct] = useState({ name: '', price: '', description: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.price || !product.description) {
            setError('全てのフィールドを入力してください');
        } else {
            try {
                const response = await fetch('http://localhost:3000/register-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                if (!response.ok) {
                    throw new Error('レスポンスエラー');
                }

                const data = await response.json();
                console.log(data);
                setError('');
            } catch (err) {
                console.error(err);
                setError('サーバーエラー');
            }
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="field-container">
                    <label>商品名:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </div>
                <div className="field-container">
                    <label>価格:</label>
                    <input type="text" name="price" value={product.price} onChange={handleChange} className="narrow" />
                </div>
                <div className="field-container">
                    <label>説明:</label>
                    <textarea name="description" value={product.description} onChange={handleChange} />
                </div>
                <input type="submit" value="登録" />
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default ProductRegistration;
