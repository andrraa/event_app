export interface TicketCreateSuccess {
  id: number;
  name: string;
  price: number;
  quota: number;
  information: string;
  event: {
    id: number;
    name: string;
  };
}

export interface TicketCreateRequest {
  event_id: number;
  name: string;
  price: number;
  quota: number;
  information: string;
}
