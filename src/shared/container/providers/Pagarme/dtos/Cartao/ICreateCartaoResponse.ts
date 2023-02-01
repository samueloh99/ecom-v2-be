export default interface ICreateCartaoResponse {
  id: string;
  first_six_digits: string;
  last_four_digits: string;
  brand: string;
  holder_name: string;
  holder_document: string;
  exp_month: number;
  exp_year: number;
  status: string;
  label: string;
  created_at: Date;
  updated_at: Date;
  billing_address: {
    zip_code: string;
    city: string;
    state: string;
    country: string;
    line_1: string;
    line_2: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    document: string;
    type: string;
    delinquent: boolean;
    created_at: Date;
    updated_at: Date;
    phones: {
      home_phone: {
        country_code: string;
        number: string;
        area_code: string;
      };
      mobile_phone: {
        country_code: string;
        number: string;
        area_code: string;
      };
    };
    metadata: {
      company: string;
    };
  };
  type: string;
  message?: string;
  errors?: {
    card: string[];
  };
}
