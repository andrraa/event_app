export interface TransacationCreateSuccess {
  id: number;
  date: string;
  event_id: number;
  ticket_id: number;
  quantity: number;
  total_price: number;
  name: string;
  email: string;
  phone: string;
  event: {
    id: number;
    name: string;
  };
  ticket: {
    id: number;
    name: string;
    price: number;
    quota: number;
    information: string;
  };
}

export interface TransactionCreateRequest {
  date: string;
  event_id: number;
  ticket_id: number;
  quantity: number;
  name: string;
  email: string;
  phone: string;
}

export interface TransactionExportRequest {
  start_date: string;
  end_date: string;
}
