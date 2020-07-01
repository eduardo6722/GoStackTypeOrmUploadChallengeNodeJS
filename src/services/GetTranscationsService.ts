import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface TranscationsBalance {
  transactions: Transaction[];
  balance: Balance;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class GetTransactionsService {
  public async execute(): Promise<TranscationsBalance> {
    const transcationRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transcationRepository.find();
    const balance = await transcationRepository.getBalance(transactions);

    return {
      transactions,
      balance,
    };
  }
}

export default GetTransactionsService;
