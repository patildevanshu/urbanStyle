import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md w-full flex flex-col h-full p-4 sm:p-6">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-4 sm:mt-6 flex-1 overflow-y-auto space-y-4 pr-1">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent
              key={item.productId || item._id}
              cartItem={item}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
      <div className="mt-auto pt-4 border-t space-y-4">
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>${totalCartAmount.toFixed(2)}</span>
        </div>
        <Button
          disabled={!cartItems || cartItems.length === 0}
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
