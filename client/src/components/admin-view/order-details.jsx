import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
      <div className="grid gap-4 sm:gap-6">
        <div className="grid gap-2">
          <div className="flex mt-4 items-center justify-between gap-2">
            <p className="font-medium text-xs sm:text-sm">Order ID</p>
            <Label className="font-mono text-xs break-all text-right">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between text-xs sm:text-sm">
            <p className="font-medium">Order Date</p>
            <Label className="text-xs sm:text-sm">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between text-xs sm:text-sm">
            <p className="font-medium">Order Price</p>
            <Label className="font-bold text-xs sm:text-sm">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between text-xs sm:text-sm">
            <p className="font-medium">Payment method</p>
            <Label className="capitalize text-xs sm:text-sm">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between text-xs sm:text-sm">
            <p className="font-medium">Payment Status</p>
            <Label className="capitalize text-xs sm:text-sm">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between text-xs sm:text-sm">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-0.5 px-2 text-[10px] sm:text-xs ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="font-medium text-sm sm:text-base">Order Items</div>
          <ul className="grid gap-2">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item, index) => (
                  <li key={item?.productId || index} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-1 py-1.5 border-b border-muted">
                    <span className="font-medium truncate">{item.title}</span>
                    <div className="flex items-center gap-3 text-muted-foreground sm:text-foreground">
                      <span>Qty: {item.quantity}</span>
                      <span className="font-semibold text-foreground">${item.price}</span>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="font-medium text-sm sm:text-base">Shipping Info</div>
          <div className="grid gap-0.5 text-xs sm:text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.pincode}</span>
            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
            {orderDetails?.addressInfo?.notes ? <span>Notes: {orderDetails?.addressInfo?.notes}</span> : null}
          </div>
        </div>

        <div className="pt-2">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
