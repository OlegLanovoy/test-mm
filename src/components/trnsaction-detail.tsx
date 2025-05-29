import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Transaction } from "@/types/transaction";

interface TransactionDetailProps {
  transaction: Transaction | null;
  onBack: () => void;
}

export default function TransactionDetail({
  transaction,
  onBack,
}: TransactionDetailProps) {
  if (!transaction) return null;

  return (
    <div className="h-screen bg-[#e7e7e7] text-black min-w-md mx-auto p-4">
      {/* Header with back button */}
      <div className="px-4 py-2 text-left">
        <button className="text-blue-600 bg-[#e7e7e7] " onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center flex-grow px-6 pt-12">
        {/* Amount */}
        <div className="text-5xl font-semibold mb-1">
          {transaction.amount < 0
            ? `$${Math.abs(transaction.amount)}`
            : `$${transaction.amount}`}
        </div>

        {/* Merchant and date */}
        <div className="text-gray-600 text-sm mb-12">
          {transaction.performedBy && (
            <span className="text-blue-600 font-medium">
              {transaction.performedBy}
            </span>
          )}
          <div className="flex flex-wrap justify-center gap-1 text-center">
            <span>{transaction.fullDate},</span>
            <span>{transaction.time}</span>
          </div>
        </div>

        {/* Payment details card */}
        <Card className="w-full bg-white border border-gray-300">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span className="text-black">
                  Status:{" "}
                  <span
                    className={
                      transaction.pending ? "text-yellow-600" : "text-green-600"
                    }
                  >
                    {transaction.pending ? "Pending" : "Approved"}
                  </span>
                </span>
              </div>
              <div className="text-gray-600 text-left">
                {transaction.description}
              </div>
              <div className="border-t border-gray-300 pt-4 mt-2">
                <div className="flex justify-between">
                  <span className="text-black">Total</span>
                  <span className="text-black">
                    {transaction.amount < 0
                      ? `$${Math.abs(transaction.amount)}`
                      : `$${transaction.amount}`}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
