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
    <div className=" h-screen bg-black text-white min-w-md mx-auto p-4">
      {/* Header with back button */}
      <div className="px-4 py-2 text-left ">
        <button className="text-blue-500" onClick={onBack}>
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
        <div className="text-gray-400 text-sm mb-12">
          {transaction.performedBy && (
            <span className="text-blue-400 font-medium">
              {transaction.performedBy}
            </span>
          )}
          <div className="flex flex-wrap justify-center gap-1 text-center">
            <span>{transaction.fullDate},</span>
            <span>{transaction.time}</span>
          </div>
        </div>

        {/* Payment details card */}
        <Card className="w-full bg-[#121212] border-0">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <span className="text-white">
                  Status:{" "}
                  <span
                    className={
                      transaction.pending ? "text-yellow-500" : "text-green-500"
                    }
                  >
                    {transaction.pending ? "Pending" : "Approved"}
                  </span>
                </span>
              </div>
              <div className="text-gray-400 text-left ">
                {transaction.description}
              </div>
              <div className="border-t border-gray-800 pt-4 mt-2">
                <div className="flex justify-between">
                  <span className="text-white">Total</span>
                  <span className="text-white">
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
