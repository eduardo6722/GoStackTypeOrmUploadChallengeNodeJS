import path from 'path';
import multer from 'multer';
import { Router } from 'express';

import loadCsv from '../helpers/csv/csvReader';
import uploadConfig from '../config/multer/multer';
import GetTransactionsService from '../services/GetTranscationsService';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (_, response) => {
  const getTransactionsService = new GetTransactionsService();
  const transactions = await getTransactionsService.execute();
  return response.json(transactions);
});

transactionsRouter.post('/', async (request, response) => {
  const createTransactionsService = new CreateTransactionService();
  const transcation = await createTransactionsService.execute(request.body);
  return response.json(transcation);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransactionsService = new DeleteTransactionService();
  const data = await deleteTransactionsService.execute(request.params.id);
  return response.json(data);
});

const uploadMiddleware = multer(uploadConfig);

transactionsRouter.post(
  '/import',
  uploadMiddleware.single('file'),
  async (request, response) => {
    const data = await loadCsv(
      path.resolve(__dirname, '..', '..', `tmp/${request.file.filename}`),
    );
    const importTransactionsService = new ImportTransactionsService();
    const transactions = await importTransactionsService.execute(data);
    return response.json(transactions);
  },
);

export default transactionsRouter;
