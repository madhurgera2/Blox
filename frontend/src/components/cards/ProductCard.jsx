import {Link} from 'react-router-dom';

const ProductCard = ({product}) => {
    return (
        <Link to={`/product/${product.productId}`}><div className="rounded-[7px] flex flex-col justify-center hover:cursor-pointer hover:shadow-xl w-[220px] border-[1px] border-grey px-[10px] py-[10px] bg-[#e9ecef]">
            <img src={product.imgUrl} className="h-[200px]" alt="prodImage" />
            <div className="px-[5px] py-[5px] flex flex-col mt-[10px]">
                <p className="font-medium text-[17px]">{product.name}</p>
                <p className="text-[14px]">{product.shortDescription}</p>
                <p className="font-bold">₹{product.price}.0/-</p>
                <div className="flex items-center mt-[3px] space-x-3">
                    <div className="flex items-center justify-center bg-[#bc6c25] px-[8px] rounded-[3px]"><p className="text-white">{product.rating}</p></div>
                    <p className="text-grey font-medium text-[15px]">{product.reviews} Reviews</p>
                </div>
            </div>
        </div></Link>
    );
}

export default ProductCard;