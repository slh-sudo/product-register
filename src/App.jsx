import React, { useState } from 'react';
import './App.css';

function ProductRegistration() {
    const [product, setProduct] = useState({ name: '', price: '', description: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product.name || !product.price || !product.description) {
            setError('全てのフィールドを入力してください');
        } else {
            console.log(product);
            // ここで製品情報をバックエンドに送信します。
            setError('');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    商品名:
                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                </label>
                <label>
                    価格:
                    <input type="text" name="price" value={product.price} onChange={handleChange} />
                </label>
                <label>
                    説明:
                    <textarea name="description" value={product.description} onChange={handleChange} />
                </label>
                <input type="submit" value="登録" />
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default ProductRegistration;
