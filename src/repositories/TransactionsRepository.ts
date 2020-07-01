import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(transactions?: Transaction[]): Promise<Balance> {
    let dbTransactions: Transaction[] = [];

    if (!transactions) {
      dbTransactions = await this.find();
    }

    return (transactions || dbTransactions).reduce(
      (a, b) => {
        const result = {
          income: b.type === 'income' ? a.income + b.value : a.income + 0,
          outcome: b.type === 'outcome' ? a.outcome + b.value : a.outcome + 0,
          total: a.income - b.value,
        };
        result.total = result.income - result.outcome;
        return result;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }
}

export default TransactionsRepository;
