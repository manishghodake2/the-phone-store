import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to Fetch Product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  if (loading) {
    return <p>Loading Product...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <button onClick={() => navigate('./products')}>Back To Products</button>

      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>{product.price}</h2>
      <p>Stock: {product.stock} </p>
      <button>Add to Cart</button>
    </div>
  );
}
export default ProductDetails;
