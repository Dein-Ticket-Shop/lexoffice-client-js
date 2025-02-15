import { BaseClient } from '../base.client';
import { Err, Ok, Result } from 'ts-results-es';
import { handleRequestError, RequestError } from '../request-error';
import {
  CreditNoteCreate,
  CreditNoteCreateResponse,
  CreditNoteRetrieveResponse,
} from './creditNote.type';
import { DocumentFileId, OptionalFinalized } from '..';
import uri from 'uri-tag';

export class CreditNoteClient extends BaseClient {
  async createCreditNote(
    creditNote: CreditNoteCreate,
    optionalFinalized?: OptionalFinalized,
  ): Promise<Result<CreditNoteCreateResponse, RequestError>> {
    return this.axios
      .post<CreditNoteCreateResponse>('/credit-notes', creditNote, { params: optionalFinalized })
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async retrieveCreditNote(id: string): Promise<Result<CreditNoteRetrieveResponse, RequestError>> {
    return this.axios
      .get<CreditNoteRetrieveResponse>(uri`/credit-notes/${id}`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }

  async renderCreditNoteDocumentFileId(id: string): Promise<Result<DocumentFileId, RequestError>> {
    return this.axios
      .get<DocumentFileId>(uri`/credit-notes/${id}/document`)
      .then((result) => Ok(result.data))
      .catch((error) => {
        return Err(handleRequestError(error));
      });
  }
}
