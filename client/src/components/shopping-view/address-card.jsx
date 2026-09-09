import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition-all ${
        selectedId?._id === addressInfo?._id
          ? "border-primary border-2 shadow-sm"
          : "border-border hover:border-primary/50"
      }`}
    >
      <CardContent className="grid p-3 sm:p-4 gap-2 text-xs sm:text-sm">
        <p><span className="font-semibold">Address:</span> {addressInfo?.address}</p>
        <p><span className="font-semibold">City:</span> {addressInfo?.city}</p>
        <p><span className="font-semibold">Pincode:</span> {addressInfo?.pincode}</p>
        <p><span className="font-semibold">Phone:</span> {addressInfo?.phone}</p>
        {addressInfo?.notes ? <p><span className="font-semibold">Notes:</span> {addressInfo?.notes}</p> : null}
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between gap-2">
        <Button size="sm" variant="outline" className="text-xs h-8" onClick={(e) => { e.stopPropagation(); handleEditAddress(addressInfo); }}>Edit</Button>
        <Button size="sm" variant="destructive" className="text-xs h-8" onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addressInfo); }}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
