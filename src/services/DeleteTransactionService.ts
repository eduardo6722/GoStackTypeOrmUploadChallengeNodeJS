// import AppError from '../errors/AppError';

import { getRepository, DeleteResult } from 'typeorm';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<DeleteResult> {
    const transcationsService = getRepository(Transaction);
    const response = await transcationsService.delete({ id });
    return response;
  }
}

export default DeleteTransactionService;
