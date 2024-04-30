import { list } from 'firebase/storage';
import React, { useState, useEffect } from 'react';

const ReviewSection = ({ listingId, authToken }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {

    try {
        const response = await fetch(`/api/listing/getreviews/${listingId}`); // Replace with your API endpoint
        const data = await response.json();
        setReviews(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
    };

    fetchReviews();
  }, []); //listingId,authToken

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`/api/listing/reviews/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                ...newReview,
                userRef: authToken,
                listingRef: listingId,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Failed to submit review');
        }
        setReviews([...reviews, data.review]);
        setNewReview({ rating: 0, comment: '' });
        setError(null); // Clear error state on successful submission
    } catch (error) {
        console.error('Error submitting review:', error);
        setError('Failed to submit review. Please try again.');
    }
};



return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '5px' }}>
    <h2 className='text-2xl font-semibold mb-4'>Reviews</h2>
    
    {reviews.length === 0 && <p>No reviews yet</p>}
    {reviews.map((review, index) => (
        <div key={review._id} className='mb-4'>
            <p>Review {index + 1}:</p> {/* Added column number */}
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
        </div>
    ))}
    <h2 className='text-2xl font-semibold mb-4 text-blue-700 text-center'>Post a new Review</h2>
    <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
        <div className="mb-4">
            <label htmlFor='rating' className="block text-lg font-semibold mb-2">Rating:</label>
            <input
                type='number'
                name='rating'
                id='rating'
                value={newReview.rating}
                onChange={handleInputChange}
                max={5}
                min={0}
                className="border border-gray-300 rounded-md p-2 w-full" // Adjusted input width
            />
        </div>
        <div className="mb-4">
            <label htmlFor='comment' className="block text-lg font-semibold mb-2">Comment:</label>
            <textarea
                name='comment'
                id='comment'
                value={newReview.comment}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full h-32" // Adjusted textarea height and width
            ></textarea>
        </div>
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Submit Review
        </button>
    </form>
</div>

);
};

export default ReviewSection;