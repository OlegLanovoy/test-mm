import { format, parseISO, isAfter, subDays } from "date-fns";
import { Card } from "./ui/card";

import { ChevronRight } from "lucide-react";
import type { Transaction } from "../types/transaction";
import transactions from "../data/transactions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { DailyPoints } from "./daily-points";

interface TransactionsListProps {
  onTransactionSelect: (transaction: Transaction) => void;
}

export function TransactionsList({
  onTransactionSelect,
}: TransactionsListProps) {
  const cardBalance = 17.3;
  const availableBalance = 1482.7;

  return (
    <div className="min-h-screen bg-[#0f0e14d6] p-4 max-w-md mx-auto">
      {/* Top Cards Row */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-6 text-left">
        <Card className="p-2 bg-[#090909] border-none gap-0">
          <h2 className="text-white text-sm font-medium">Card Balance</h2>
          <div className="text-white text-2xl font-bold">
            ${cardBalance.toFixed(2)}
          </div>
          <div className="text-gray-400 text-sm">
            ${availableBalance.toFixed(2)} Available
          </div>
        </Card>
        <DailyPoints />

        <Card
          className="p-2 bg-[#090909] border-none col-start-2 row-span-full justify-between gap-0
        "
        >
          <div>
            <h2 className="text-white text-sm font-medium">No Payment Due</h2>
            <div className="text-gray-400 text-sm">You've paid your</div>
            <div className="text-gray-400 text-sm">September balance.</div>
          </div>
          <div className="flex justify-end mt-2">
            <div className="w-16 h-16 bg-[#2b2934] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCheck}
                size="2xl"
                className="text-white"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Latest Transactions */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold text-left ">
          Latest Transactions
        </h3>

        <div className="divide-y-1 divide-[#1a1a1a]">
          {transactions.map((tx, index) => {
            const icon =
              tx.name === "Apple" ? (
                <span className="text-white text-lg">🍎</span>
              ) : tx.name === "IKEA" ? (
                <span className="text-white text-xs font-bold">IKEA</span>
              ) : tx.name === "Target" ? (
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                </div>
              ) : (
                <span className="text-white text-lg">🏦</span>
              );

            const iconBg =
              tx.name === "Apple"
                ? "bg-gray-700"
                : tx.name === "IKEA"
                ? "bg-blue-600"
                : tx.name === "Target"
                ? "bg-red-600"
                : "bg-gradient-to-br from-orange-400 to-purple-600";

            const isCredit = tx.type === "Credit";
            const amount =
              tx.type === "Payment"
                ? `+$${tx.amount.toFixed(2)}`
                : `$${tx.amount.toFixed(2)}`;

            const percentage = isCredit ? "3%" : "2%";

            const isFirst = index === 0;
            const isLast = index === transactions.length - 1;
            const borderClass = isFirst
              ? "rounded-t-lg"
              : isLast
              ? "rounded-b-lg"
              : "";

            let displayDate = "Invalid date";

            try {
              const parsed = parseISO(tx.fullDate);
              const recent = isAfter(parsed, subDays(new Date(), 7));
              displayDate = recent
                ? format(parsed, "EEEE")
                : format(parsed, "MM/dd/yyyy");
            } catch (err) {
              displayDate = tx.fullDate ?? "Unknown";
            }
            return (
              <div
                key={tx.id}
                className={`w-full p-4 h-auto justify-start hover:bg-gray-900 bg-[#090909] ${borderClass}`}
                onClick={() => onTransactionSelect(tx as Transaction)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div
                    className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}
                  >
                    {icon}
                  </div>

                  <div className="flex-1 text-left">
                    <div className="text-white font-medium">{tx.name}</div>
                    <div className="text-gray-400 text-sm">
                      {tx.pending && (
                        <span className="text-yellow-500 font-semibold mr-1">
                          Pending
                        </span>
                      )}
                      {tx.description.length > 20
                        ? tx.description.slice(0, 23) + "..."
                        : tx.description}
                    </div>

                    <div className="text-gray-400 text-sm">
                      {tx.performedBy && (
                        <span className="text-blue-400 font-medium mr-1">
                          {tx.performedBy}
                        </span>
                      )}
                      {displayDate}
                    </div>
                  </div>

                  <div className="text-right flex items-start  space-x-2">
                    <div>
                      <div className="text-white font-semibold  ">{amount}</div>
                      <div className="text-gray-400 text-xs">{percentage}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
