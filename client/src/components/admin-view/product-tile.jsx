import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto flex flex-col justify-between overflow-hidden shadow-sm">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[180px] sm:h-[240px] md:h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-3 sm:p-4">
          <h2 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 truncate">{product?.title}</h2>
          <div className="flex justify-between items-center mb-1">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-xs sm:text-sm text-muted-foreground" : "text-sm sm:text-base font-bold text-primary"
              }`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-sm sm:text-base font-bold text-primary">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center p-3 sm:p-4 pt-0 sm:pt-0 gap-2">
          <Button
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 flex-1"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button size="sm" variant="destructive" className="text-xs sm:text-sm h-8 sm:h-9 flex-1" onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
