import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import SmallProduct from "./SmallProduct";
import Ratings from "./Ratings";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className="flex flex-col md:flex-row ">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg text-white ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write your review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg text-white ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg text-white ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      <section>
        {activeTab === 1 && (
           <div className="mt-4 text-white">
            {userInfo ? (
                <form onSubmit={submitHandler}>
                    <div className="my-4">
                        <label htmlFor="rating" className="block text-xl mb-2">Rating</label>
                        <select id="rating" required value={rating} onChange={e => setRating(e.target.value)} className="p-2 border rounded-lg xl:w-[40rem] text-white bg-black">
                            <option value="">Select</option>
                            <option value="1">Very Bad</option>
                            <option value="2">Bad</option>
                            <option value="3">Good</option>
                            <option value="4">Very Good</option>
                            <option value="5">Excellent</option>
                        </select>
                    </div>

                    <div className="my-2">
                        <label htmlFor="comment" className="block text-xl mb-2">Comment</label>
                        <textarea id="comment" required value={comment} onChange={e => setComment(e.target.value)} rows="3" className="p-2 border rounded-lg xl:w-[40rem] text-white bg-black"></textarea>
                    </div>

                        <button type="submit" disabled={loadingProductReview} className="py-2 px-4 bg-black text-white rounded-md opacity-80 hover:opacity-100">Add Review</button>
                </form>
            ): (
                <p>Please <Link to="/login">sign in</Link> to add review.</p>
            )}
           </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
            <>
                <div>{product.reviews.length === 0 && <p className="text-white font-bold">No reviews</p>}</div>

                <div>
                    {product.reviews.map((review) => (
                        <div key={review._id} className="bg-black p-4 text-white rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[24rem] mb-5">
                          <div className="flex justify-between">
                                <strong className="text-[B0B0B0]">{review.name}</strong>
                                <p className="text-[B0B0B0]">{review.createdAt.substr(0, 10)}</p>
                            </div>  
                            <p className="my-4">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </>
        )}
      </section>

      <section>
        {activeTab === 3 && (
            <section className=" flex flex-wrap ml-[8rem]">
                {!data ? (
                    <Loader />
                ): (
                    data.map((product) => (
                        <div key={product._id}>
                        <SmallProduct product={product} />
                        </div>
                    ))
                )}
            </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
