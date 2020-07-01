import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(data: any[]): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService();
    const transactions: Transaction[] = [];

    const payload = data.reduce((acc, item) => {
      acc.push({
        title: item[0],
        type: item[1],
        value: item[2],
        category: item[3],
      });
      return acc;
    }, []);

    // eslint-disable-next-line no-restricted-syntax
    for await (const item of payload) {
      const transaction = await createTransactionService.execute(item);
      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
