import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Restful API dev', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.restful-api.dev';
  let objectId = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Objetos', () => {
    it('POST cria um objeto', async () => {
      objectId = await p
        .spec()
        .post(`${baseUrl}/objects`)
        .withJson({ name: 'Notebook', data: { year: 2024 } })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ name: 'Notebook' })
        .returns('id');
    });

    it('GET busca o objeto', async () => {
      await p
        .spec()
        .get(`${baseUrl}/objects/${objectId}`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ id: objectId, name: 'Notebook' });
    });

    it('PUT atualiza o objeto', async () => {
      await p
        .spec()
        .put(`${baseUrl}/objects/${objectId}`)
        .withJson({ name: 'Notebook Novo', data: { year: 2025 } })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ name: 'Notebook Novo' });
    });

    it('PATCH altera o nome', async () => {
      await p
        .spec()
        .patch(`${baseUrl}/objects/${objectId}`)
        .withJson({ name: 'Notebook Renomeado' })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({ name: 'Notebook Renomeado' });
    });

    it('DELETE remove o objeto', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/objects/${objectId}`)
        .expectStatus(StatusCodes.OK);
    });
  });
});