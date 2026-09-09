import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="p-6 sm:p-10 max-w-md w-full text-center">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl sm:text-3xl font-bold">Payment is successful!</CardTitle>
        </CardHeader>
        <Button className="mt-6 w-full" onClick={() => navigate("/shop/account")}>
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
