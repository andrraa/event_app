export interface EventCreateSuccess {
  id: number;
  location: string;
  description: string;
  information: string;
  image: string;
  start_date: string;
  end_date: string;
  event: {
    id: number;
    name: string;
  };
  province: {
    id: number;
    province_name: string;
  };
  category: {
    id: number;
    category_name: string;
  };
}

export interface EventValidationError {
  errors: {
    event_id?: string[];
    province_id?: string[];
    location?: string[];
    category_id?: string[];
    description?: string[];
    information?: string[];
    image?: string[];
    start_date?: string[];
    end_date?: string[];
  };
}
