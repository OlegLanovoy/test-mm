export interface Transaction {
  id: string;
  type: "Payment" | "Credit";
  amount: number;
  name: string;
  description: string;
  fullDate: string;
  pending: boolean;
  time: string;
  dateName: string;
  performedBy: string;
}
