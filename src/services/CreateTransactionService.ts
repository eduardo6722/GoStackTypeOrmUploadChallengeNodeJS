import { getRepository, getCustomRepository } from 'typeorm';

import Category from '../models/Category';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface TransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: TransactionRequest): Promise<Transaction> {
    const transcationRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const balance = await transcationRepository.getBalance();

    if (type === 'outcome' && value > balance.total) {
      throw new AppError('No affor');
    }

    let dbCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!dbCategory) {
      dbCategory = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(dbCategory);
    }

    const transaction = transcationRepository.create({
      title,
      value,
      type,
      category_id: dbCategory.id,
    });

    await transcationRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
