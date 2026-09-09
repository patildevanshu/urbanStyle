import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[180px] sm:h-[240px] md:h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-red-500 hover:bg-red-600 text-[10px] sm:text-xs px-1.5 py-0.5">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-red-500 hover:bg-red-600 text-[10px] sm:text-xs px-1.5 py-0.5">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-red-500 hover:bg-red-600 text-[10px] sm:text-xs px-1.5 py-0.5">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-2.5 sm:p-4">
          <h2 className="text-xs sm:text-base md:text-lg font-bold mb-1 sm:mb-2 truncate">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-1 sm:mb-2 text-[11px] sm:text-sm text-muted-foreground">
            <span className="truncate">{categoryOptionsMap[product?.category]}</span>
            <span className="truncate ml-1">{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`${
                product?.salePrice > 0
                  ? "line-through text-xs sm:text-sm text-muted-foreground"
                  : "text-sm sm:text-base md:text-lg font-bold text-primary"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-2.5 sm:p-4 pt-0 sm:pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed text-xs sm:text-sm h-8 sm:h-10">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full text-xs sm:text-sm h-8 sm:h-10"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
