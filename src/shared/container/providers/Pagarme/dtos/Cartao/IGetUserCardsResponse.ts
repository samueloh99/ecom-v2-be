export default interface IGetUserCardsResponse {
  data: [
    {
      id: string;
      first_six_digits: string;
      last_four_digits: string;
      brand: string;
      holder_name: string;
      exp_month: number;
      exp_year: number;
      status: string;
      created_at: Date;
      updated_at: Date;
      billing_address: {
        line_1: string;
        zip_code: string;
        city: string;
        state: string;
        country: string;
      };
    }[],
  ];
  paging: {
    total: number;
  };
}
