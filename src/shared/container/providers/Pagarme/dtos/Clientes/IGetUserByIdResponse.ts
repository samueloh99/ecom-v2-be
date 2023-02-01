export default interface IGetUserByIdResponse {
  id: string;
  name: string;
  email: string;
  gender: string;
  delinquent: boolean;
  address: {
    id: string;
    line_1: string;
    line_2: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
  phones: {};
  metadata: {
    company: string;
  };
}
