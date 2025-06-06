import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  console.log({
    page,
    totalPages,
    indexOfLastTransaction,
    indexOfFirstTransaction,
  });

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent Transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                account={account}
                key={account.id}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account: Account) => (
          <TabsContent
            className="space-y-4"
            key={account.id}
            value={account.appwriteItemId}
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />
          </TabsContent>
        ))}
      </Tabs>
      <TransactionsTable transactions={currentTransactions} />
      {totalPages > 1 && (
        <div className="my-4 w-full">
          <Pagination totalPages={totalPages} page={page} />
        </div>
      )}
    </section>
  );
};

export default RecentTransactions;
